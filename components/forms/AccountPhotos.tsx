"use client";

import { addUserImages } from "@/libs/actions/user.actions";
import { SingleImageDropzone } from "../edgeStore/singleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import Link from "next/link";
import { useState } from "react";

type AccountPhotosProps = {
  user: {
    id: string;
    username: string;
    bio: string;
    age: number;
    height: number;
    weight: number;
    relationshipstatus: string;
    lookingfor: string;
    gender: string;
    race: string;
  };
};

export const AccountPhotos: React.FC<AccountPhotosProps> = ({ user }) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState("");

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            setUrl(res.url);
            addUserImages(user?.id, res.url);
            console.log(res);
          }
        }}
      >
        Upload
      </button>
      {"   " && url && <Link href={url}>Link</Link>}
    </div>
  );
};

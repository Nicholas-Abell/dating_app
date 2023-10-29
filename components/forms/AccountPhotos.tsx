"use client";

import { addUserImages } from "@/libs/actions/user.actions";
import { SingleImageDropzone } from "../edgeStore/singleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
    images?: string[];
  };
};

export const AccountPhotos: React.FC<AccountPhotosProps> = ({ user }) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState("");

  return (
    <div className="grid grid-cols-3 gap-2 justify-center items-center w-full md:h-[80vh]">
      {user.images &&
        user.images.length > 0 &&
        user.images?.map((image, key) => (
          <div className="relative h-[40vh] md:h-[80vh]" key={key}>
            <button className="absolute z-10 top-0 left-0 text-black hover:text-red-600">
              <RiDeleteBin5Fill size={25} />
            </button>
            <Image
              src={image}
              key={key}
              className="object-cover object-center"
              alt="pic"
              fill
            />
          </div>
        ))}
      <div>
        {user.images && user.images.length < 3 && (
          <>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <button
              className="bg-gray-200 text-gray-700 rounded-full w-full"
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
          </>
        )}
        {"   " && url && <Link href={url}>Link</Link>}
      </div>
    </div>
  );
};

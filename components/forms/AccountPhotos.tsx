"use client";
import { addUserImage, deleteUserImage } from "@/libs/actions/user.actions";
import { SingleImageDropzone } from "../edgeStore/singleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

type AccountPhotosProps = {
  id: string;
  images: string[];
};

export const AccountPhotos: React.FC<AccountPhotosProps> = ({ id, images }) => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <div className="grid grid-cols-3 gap-2 justify-center items-center w-full md:h-[80vh]">
      {images &&
        images.length > 0 &&
        images?.map((image, key) => (
          <div className="relative h-[40vh] md:h-[80vh]" key={key}>
            <button
              className="absolute z-10 top-0 left-0 text-black hover:text-red-600"
              onClick={async () => {
                const res = await edgestore.publicFiles.delete({
                  url: image,
                });
                deleteUserImage(id, image);
                router.refresh();
                console.log(res);
              }}
            >
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
        {images && images.length < 3 && (
          <>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <div className="h-[6px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              className="bg-gray-200 text-gray-700 rounded-full w-full"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      setProgress(progress);
                      console.log(progress);
                    },
                  });
                  setUrl(res.url);
                  addUserImage(id, res.url);
                  router.refresh();
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

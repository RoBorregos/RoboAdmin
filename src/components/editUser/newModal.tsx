"use client";

import { useEffect, useRef, useState } from "react";
import Edit from "./edit";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddImage from "./addImage";
import { api } from "rbrgs/utils/api";

interface Props {
  isOpen: boolean;
}

// type Variant = "EDIT" | "IMAGE";

const NewMemberModal: React.FC<Props> = ({ isOpen }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const { mutateAsync: addImage } = api.githubApi.addFileToBranch.useMutation();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  //   const [variant, setVariant] = useState<Variant>("IMAGE");

  const handleClick = () => {
    console.log("clicked");
  };

  const handleUpdateImage = (image: string) => {
    setCroppedImage(image);
  };

  const onBeforeSubmit = async (newId: number) => {
    if (croppedImage == null) {
      alert("Please upload an image");
      return false;
    }

    await addImage({
      owner: "RoBorregos",
      repo: "roborregos-web",
      branch: `add-member-${newId}`,
      filePath: `src/images/members/${newId}.jpg`,
      fileContent: croppedImage,
      commitMessage: "Upload image",
    });

    return true;
  };

  useEffect(() => {
    if (dialog == null) return;
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          id="idd"
          ref={dialog}
          className={
            "fixed right-9 z-50 w-3/4 overflow-auto rounded-lg bg-zinc-700 p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40"
          }
        >
          <div>
            <div>
              {/* <MainButtons variant={variant} onClick={toggleVariant} image /> */}
              {/* {variant != "IMAGE" ? ( */}
              <Edit
                handleClick={handleClick}
                add
                onBeforeAdd={onBeforeSubmit}
              />
              {/* ) : ( */}
              <AddImage
                handleUpdateImage={handleUpdateImage}
                croppedImage={croppedImage}
              />
              {/* )} */}
            </div>

            <button
              className="absolute right-3 top-3 p-2 text-white"
              onClick={() => dialog.current?.close()}
            >
              <AiOutlineCloseCircle className="text-2xl" />
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default NewMemberModal;

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import EditUser from "rbrgs/components/editUser/editUser";
import ImageDrop from "rbrgs/components/imgDrop";
import ImageCropper from "rbrgs/components/imgPreview";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import ImagePreview from "rbrgs/components/imgPreview";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const examples = api.test.test2.useQuery();
  const createExample = api.test.test1.useMutation();
  const [input, setInput] = useState("");
  const util = api.useContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>

      <div className="flex flex-col items-center justify-center gap-10">
      <ImageDrop handleFileSelect={handleFileSelect} />
      {selectedFile && (
        <div>
          {/* <ImagePreview image={URL.createObjectURL(selectedFile)} aspectRatio={600/456} onFinishedCropping={(image) => setCroppedImage(image)} /> */}
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="" />}
    </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
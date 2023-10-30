/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ImageDrop from "rbrgs/components/imageDrop";
import ImagePreview from "rbrgs/components/imagePreview";

const ImagesPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <ImageDrop handleFileSelect={handleFileSelect} />
      {selectedFile && (
        <div>
          <ImagePreview image={URL.createObjectURL(selectedFile)} aspectRatio={10/3} onFinishedCropping={(image) => setCroppedImage(image)} />
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="" />}
    </div>
  );
};

export default ImagesPage;

import { useState } from "react";
import ImageDrop from "../imgDrop";
import ImagePreview from "../imgPreview";

const AddImage = ({
  handleUpdateImage,
  croppedImage,
}: {
  handleUpdateImage: (image: string) => void;
  croppedImage: string | null;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCroppedImage = (image: string) => {
    if (image) {
      handleUpdateImage(image);
      alert("Image uploaded");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <ImageDrop handleFileSelect={handleFileSelect} />
      {selectedFile && (
        <div>
          <ImagePreview
            image={URL.createObjectURL(selectedFile)}
            desiredHeight={456}
            desiredWidth={600}
            onFinishedCropping={handleCroppedImage}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {croppedImage && <img src={croppedImage} alt="" />}
    </div>
  );
};

export default AddImage;

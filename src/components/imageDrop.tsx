import { type FC } from "react";

type ImageDropProps = {
    handleFileSelect: (file: File) => void;
};

const ImageDrop: FC<ImageDropProps> = ({handleFileSelect}) => {
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer?.files[0];
    console.log(file);

    if (file) {
      handleFileSelect(file);
    }
  };

  const handleOnDragover = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <div
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleOnDragover}
      className="flex w-1/2 p-24 items-center justify-center border-4 border-dashed border-gray-400 self-center"
    >
      <p>You can drag an image file here</p>
    </div>
  );
};

export default ImageDrop;

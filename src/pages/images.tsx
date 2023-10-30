/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ImageDrop from "rbrgs/components/imageDrop";
import ImagePreview from "rbrgs/components/imagePreview";

const ImagesPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // const [croppedData, setCroppedData] = useState<string | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // const cropImage = (imageSelected: File): void => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       const image = new Image();
  //       console.log(imageSelected);
  //       image.src = URL.createObjectURL(imageSelected);
  //       image.onload = () => {
  //         const size = Math.min(image.width, image.height);
  //         const x = (image.width - size) / 2;
  //         const y = (image.height - size) / 2;
  //         context.drawImage(
  //           image,
  //           x,
  //           y,
  //           size,
  //           size,
  //           0,
  //           0,
  //           canvas.width,
  //           canvas.height,
  //         );
  //         const data = canvas.toDataURL();
  //         setCroppedData(data);
  //       };
  //     }
  //   }
  // };

  const handleFileSelect = (file: File) => {
    // const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // cropImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ImageDrop handleFileSelect={handleFileSelect} />
      {selectedFile && (
        <div className="h-1/2">
          <ImagePreview image={URL.createObjectURL(selectedFile)} aspectRatio={1} onFinishedCropping={(image) => setCroppedImage(image)} />
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="" />}
    </div>

    // <div>
    //   <input type="file" accept="image/*" onChange={handleFileSelect} />
    //   {selectedFile && (
    //     <div>
    //         <img src={URL.createObjectURL(selectedFile)} onLoad={handleImageLoad} alt="" />
    //         <canvas className='hidden' ref={canvasRef} width={256} height={256} onClick={handleImageCrop} />
    //     </div>
    //   )}
    //   {croppedData && <img src={croppedData} alt='' />}
    // </div>
  );
};

export default ImagesPage;

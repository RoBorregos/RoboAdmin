import { useState, type FC } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop/types";

interface ImageCropperProps {
  image: string;
  onFinishedCropping: (arg0: string) => void;
  desiredWidth: number;
  desiredHeight: number;
}

const ImageCropper: FC<ImageCropperProps> = ({
  image,
  onFinishedCropping,
  desiredWidth,
  desiredHeight,
}) => {
  const aspectRatio = desiredWidth / desiredHeight; 
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const newImage = new Image();
      newImage.addEventListener("load", () => resolve(newImage));
      newImage.addEventListener("error", (error) => reject(error));
      newImage.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      newImage.src = url;
    });

/*   const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const newImage = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx || !newImage) {
      return;
    }

    canvas.width = newImage.width;
    canvas.height = newImage.height;

    ctx.drawImage(newImage, 0, 0);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    
    if (!croppedCtx) {
      return;
    }

    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    console.log(croppedCanvas);
    console.log("getCroppedImg", croppedCanvas.toDataURL("image/png"));

    return croppedCanvas.toDataURL("image/png");
  }; */

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area, desiredWidth: number, desiredHeight: number) => {
    const newImage = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx || !newImage) {
      return;
    }
  
    canvas.width = newImage.width;
    canvas.height = newImage.height;
  
    ctx.drawImage(newImage, 0, 0);
  
    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    
    if (!croppedCtx) {
      return;
    }
  
    croppedCanvas.width = desiredWidth;
    croppedCanvas.height = desiredHeight;
  
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      desiredWidth,
      desiredHeight
    );
  
    // console.log(croppedCanvas);
    // console.log("getCroppedImg", croppedCanvas.toDataURL("image/png"));
  
    return croppedCanvas.toDataURL("image/png");
  };
  

  async function onFinished() {
    const cropped = await getCroppedImg(image, croppedAreaPixels, desiredWidth, desiredHeight);

    console.log("onFinished", cropped);

    if (!cropped) {
      return;
    }

    onFinishedCropping(cropped);
  }

  return (
    <div className="flex h-1/2 w-screen flex-col items-center gap-5">
      <div className="relative h-80 w-1/2">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={(_croppedArea: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)}
          onZoomChange={setZoom}
        />
      </div>
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e) => setZoom(Number(e.target.value))}
        className="px-6 py-0"
      />
      <button className="rounded-lg bg-slate-200 px-5 py-2" onClick={() => void onFinished()}>Upload</button>
    </div>
  );
};

export default ImageCropper;
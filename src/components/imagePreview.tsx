import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop/types";

interface ImageCropperProps {
  image: string;
  aspectRatio: number;
  onFinishedCropping: (arg0: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  aspectRatio,
  onFinishedCropping,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState<string>(image);

  function onFinished() {
    onFinishedCropping(preview);
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    const image = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        image,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height,
      );
      setPreview(canvas.toDataURL("image/png"));
    }
  };

  // const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
  //   const canvas = document.createElement("canvas");
  //   const image = new Image();
  //   image.src = URL.createObjectURL(new Blob([croppedAreaPixels], { type: "image/png" }));

  //   image.onload = () => {
  //     const ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       canvas.width = croppedArea.width;
  //       canvas.height = croppedArea.height;
  //       ctx.drawImage(image, 0, 0, croppedArea.width, croppedArea.height, 0, 0, croppedArea.width, croppedArea.height);
  //       setPreview(canvas.toDataURL("image/png"));
  //     }
  //   };
  // };

  return (
    <div className="flex flex-col">
      <div>
        <Cropper
          classes={{ containerClassName: "mt-96 h-1/2" }}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex h-20 w-1/2 -translate-x-1/2 items-center self-center">
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Preview" />
      </div>

      <div className="flex items-center justify-center">
      </div>
    </div>
  );
};

export default ImageCropper;

// Image container that specifies a default image if the original image is invalid

import { env } from "rbrgs/env.mjs";
import { isImgUrl } from "rbrgs/utils/image";
import { useEffect, useState } from "react";
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ValidImage = ({ className, ...props }: ImageProps) => {
  const [imageUrl, setimageUrl] = useState(env.NEXT_PUBLIC_DEFAULT_IMAGE);

  useEffect(() => {
    const fetchImg = async () => {
      if (props.src) {
        const isValid = await isImgUrl(props.src);
        if (isValid) {
          setimageUrl(props.src);
        } else {
          console.log("Invalid image url:", props.src);
        }
      }
    };
    void fetchImg();
  }, [props.src]);

  return <img className={className ?? ""} {...props} src={imageUrl}/>;
};

export default ValidImage;

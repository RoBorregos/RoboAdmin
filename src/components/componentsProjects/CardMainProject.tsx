
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

interface CardMainProjectProps {
  title: string;
  description: string;
  wiki: string | null;
  image: string;
  editable: boolean;
  id: string;
  cropped?: string | null | undefined;
}

const CardMainProject: React.FC<CardMainProjectProps> = ({
  id,
  title,
  description,
  wiki,
  image,
  editable,
  cropped
}) => {

  const [imageState, setImage] = useState("");



  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(`https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/projects/${image}.jpg`)
      setImage(response.url)
    }
    fecthData()

  }, [])

  return (
    <div className="flex bg-gradient-to-tr from-slate-950 to-slate-800 rounded-3xl py-2 px-3 items-center h-full  "
    >
      {!editable ? (
        <div className="w-1/2">
          <img className="w-full h-52 object-cover" src={imageState} alt="Project" />
        </div>

      ) : (
        <div className="w-1/2">
          {cropped ? (
            <img className="w-full h-52 object-cover" src={cropped} alt="Project" />
          ) : (

            <img className="w-full h-52 object-cover" src={imageState} alt="Project" />
          )}
        </div>
      )}

      <div className="w-1/2 px-5">
        {/* w-1/2 flex flex-col px-5 text-start */}
        <h2 className="mb-1 text-xs font-bold text-white">{title}</h2>
        <p className="mb-1 text-white text-xs">{description}</p>
        <div className="text-xs border border-custom-blue rounded-md w-fit px-1 py-1 ">
          {wiki ? "learn more" : "coming soon"}
        </div>
        {!editable && (
          <Modal
            title={title}
            description={description}
            image={image}
            wiki={wiki}
            id={id}
          />
        )
        }
      </div>
    </div>
  );
};

export default CardMainProject;
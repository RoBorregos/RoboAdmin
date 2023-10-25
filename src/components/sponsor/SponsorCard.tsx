import { useState } from "react";
import { RouterOutputs } from "rbrgs/utils/api";

export const SponsorCard = ({
  sponsor,
}: {
  sponsor: RouterOutputs["sponsor"]["getSponsorById"] | undefined | null;
}) => {

  let title = "";
  let subtitle1 = "";
  let subtitle2 = "";

  if (!sponsor) {
    title = "Cargando";
    subtitle1 = "Obteniendo datos del sponsor.";
  } else if (sponsor) {
    title = sponsor.name;
    subtitle1 = `img path: ${sponsor.img_path}`;
    subtitle2 = `url: ${sponsor.url}`;
  } else {
    title = "No se encontró el sponsor";
    subtitle1 = `Intenta de nuevo.`;
  }
  return (
    <a
      className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 break-all">
        {subtitle1}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400 break-all">
        {subtitle2}
      </p>
    </a>
  );
};

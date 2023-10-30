import type { RouterOutputs } from "rbrgs/utils/api";

export const SponsorHistoryCard = ({
  sponsorHistory,
}: {
  sponsorHistory:
    | RouterOutputs["sponsor"]["getSponsorHistoryById"]
    | undefined
    | null;
}) => {
  let title = "";
  let subtitle1 = "";

  if (!sponsorHistory) {
    title = "Cargando";
    subtitle1 = "Obteniendo datos del sponsor.";
  } else if (sponsorHistory) {
    title = `Fecha de modificación: ${sponsorHistory.updatedAt.toTimeString()}`;
    subtitle1 = `Usuario: ${
      sponsorHistory.User.name ?? sponsorHistory.User.email
    }`;
  } else {
    title = "No se encontró el item";
    subtitle1 = `Intenta de nuevo.`;
  }
  return (
    <a className="block max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="break-words font-normal text-gray-700 dark:text-gray-400">
        {subtitle1}
      </p>
      <button
        className="m-2 rounded-md bg-blue-700 p-1 text-white text-base"
        onClick={() => {
          const newWindow = window.open('', '_blank');
          const jsonObject = JSON.parse(sponsorHistory?.json ?? "{}");
          if (newWindow) {
            newWindow.document.write(`<pre>${JSON.stringify(jsonObject, null, 2)}</pre>`);
          }
        }}
      >
        Ver JSON
      </button>
    </a>
  );
};

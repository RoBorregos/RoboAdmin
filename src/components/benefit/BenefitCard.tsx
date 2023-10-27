import { RouterOutputs } from "rbrgs/utils/api";

export const BenefitCard = ({
  benefit,
  reducedView = false,
}: {
  benefit: RouterOutputs["sponsor"]["getBenefitById"] | undefined | null;
  reducedView?: boolean;
}) => {
  let title;
  if (!benefit) {
    title = "Cargando";
  } else if (benefit) {
    title = benefit.updatedAt.toTimeString();
  }

  return (
    <a className="block max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {!reducedView && (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Last Updated: {title}
        </h5>
      )}
      <p className="break-all font-normal text-gray-700 dark:text-gray-400">
        English: {benefit?.enDescription ?? "..."}
      </p>
      {!reducedView && (
        <p className="break-all font-normal text-gray-700 dark:text-gray-400">
          Español: {benefit?.esDescription ?? "..."}
        </p>
      )}
    </a>
  );
};

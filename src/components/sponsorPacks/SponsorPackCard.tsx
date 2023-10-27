import { RouterOutputs } from "rbrgs/utils/api";
import { BenefitWrapper } from "../benefit/BenefitWrapper";
import { BenefitCardConcise } from "../benefit/BenefitCardConcise";
// import { BenefitCard } from "../benefit/BenefitCard";

export const SponsorPackCard = ({
  sponsorPack,
}: {
  sponsorPack:
    | RouterOutputs["sponsor"]["getSponsorPackById"]
    | undefined
    | null;
}) => {
  let title;
  if (!sponsorPack) {
    title = "Cargando";
  } else if (sponsorPack) {
    title = sponsorPack.name;
  }

  return (
    <a className="block max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Nombre del paquete: {title}
      </h5>
      <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Beneficios asociados:
      </h6>

      <div className="flex w-full flex-col justify-center">
        {sponsorPack?.benefits && sponsorPack.benefits.length > 0 ? (
          sponsorPack?.benefits?.map((benefit) => (
            <BenefitCardConcise
              key={benefit.id}
              benefitId={benefit.id}
              reducedView={true}
            />
          ))
        ) : (
          <p>No hay beneficios asociados a este paquete</p>
        )}
      </div>
    </a>
  );
};

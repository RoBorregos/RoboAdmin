import { api } from "rbrgs/utils/api";
import { BenefitCard } from "./BenefitCard";

export const BenefitCardConcise = ({
  benefitId,
  reducedView = false,
}: {
  benefitId?: string;
  reducedView?: boolean;
}) => {
  const { data: benefit } = api.sponsor.getBenefitById.useQuery({
    id: benefitId,
  });

  return <BenefitCard benefit={benefit} reducedView={reducedView} />;
};

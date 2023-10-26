import { api } from "rbrgs/utils/api";
import { BenefitCard } from "./BenefitCard";
import { BenefitEdit } from "./BenefitEdit";
import { EditableCard } from "../general/EditableCard";

export const BenefitWrapper = ({ benefitId }: { benefitId?: string }) => {
  const { data: benefit, isLoading } = api.sponsor.getBenefitById.useQuery({
    id: benefitId,
  });

  return (
    <EditableCard
      hasEdit={benefitId ? true : false}
      isLoading={isLoading}
      editView={<BenefitEdit benefit={benefit} />}
      infoView={<BenefitCard benefit={benefit} />}
    />
  );
};

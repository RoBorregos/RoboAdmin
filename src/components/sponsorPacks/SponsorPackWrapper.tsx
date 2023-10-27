import { api } from "rbrgs/utils/api";
import { SponsorPackCard } from "./SponsorPackCard";
import { EditableCard } from "../general/EditableCard";
import { SponsorPackForm } from "../sponsor/SponsorPackForm";

export const SponsorPackWrapper = ({ sponsorPackId }: { sponsorPackId?: string }) => {
  const { data: sponsorPack, isLoading } = api.sponsor.getSponsorPackById.useQuery({
    id: sponsorPackId,
  });

  return (
    <EditableCard
      hasEdit={sponsorPackId ? true : false}
      isLoading={isLoading}
      editView={<SponsorPackForm sponsorPack={sponsorPack} />}
      infoView={<SponsorPackCard sponsorPack={sponsorPack} />}
    />
  );
};

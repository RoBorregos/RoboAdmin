import { useState } from "react";
import { api } from "rbrgs/utils/api";
import { SponsorCard } from "./SponsorCard";
import { SponsorEdit } from "./SponsorEdit";
import { EditableCard } from "../general/EditableCard";

export const SponsorWrapper = ({ sponsorId }: { sponsorId?: string }) => {
  const { data: sponsor, isLoading } = api.sponsor.getSponsorById.useQuery({
    id: sponsorId,
  });
  
  return (
    <EditableCard
      hasEdit={sponsorId ? true : false}
      isLoading={isLoading}
      editView={<SponsorEdit sponsor={sponsor} />}
      infoView={<SponsorCard sponsor={sponsor} />}
    />
  );
};

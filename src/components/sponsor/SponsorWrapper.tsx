import { useState } from "react";
import { api } from "rbrgs/utils/api";
import { SponsorCard } from "./SponsorCard";
import { SponsorEdit } from "./SponsorEdit";

export const SponsorWrapper = ({ sponsorId }: { sponsorId?: string }) => {
  const { data: sponsor, isLoading } = api.sponsor.getSponsorById.useQuery({
    id: sponsorId,
  });
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex flex-col w-fit m-2">
      {sponsorId && <button onClick={() => setEdit(!edit)}><p className="bg-green-200 w-fit ml-auto mr-auto p-2 rounded-md mb-2">Edit</p></button>}
      {isLoading && <p>Cargando...</p>}
      {!isLoading &&
        (edit ? (
          <SponsorEdit sponsor={sponsor} />
        ) : (
          <SponsorCard sponsor={sponsor} />
        ))}
    </div>
  );
};

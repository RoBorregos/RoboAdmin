import Layout from "rbrgs/components/layout/Layout";
import { SponsorWrapper } from "rbrgs/components/sponsor/SponsorWrapper";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SponsorModal } from "rbrgs/components/sponsor/SponsorModal";
import { SponsorEdit } from "rbrgs/components/sponsor/SponsorEdit";

export default function Home() {
  const [seeSponsors, setSeeSponsors] = useState(false);
  const [seeModal, setSeeModal] = useState(false);

  const modalTitle = seeSponsors
    ? "Añadir sponsor"
    : "Añadir paquete de sponsor";

  return (
    <Layout>
      {seeModal && (
        <SponsorModal title={modalTitle} setSeeModal={setSeeModal}>
          {seeSponsors ? (
            <SponsorEdit sponsor={undefined} />
          ) : (
            <p className="text-black">No hay sponsors D:</p>
          )}
        </SponsorModal>
      )}
      <div className="flex w-full flex-row flex-wrap justify-center">
        <div className="my-4 flex w-1/2 flex-row justify-center space-x-6 md:w-1/3">
          <button
            className="rounded-md bg-slate-200 p-2 hover:bg-slate-300"
            onClick={() => {
              setSeeSponsors(true);
            }}
          >
            See Sponsors
          </button>
          <button
            className="rounded-md bg-slate-200 p-2 hover:bg-slate-300"
            onClick={() => {
              setSeeSponsors(false);
            }}
          >
            See Sponsor packs
          </button>
          <AiOutlinePlusCircle
            size={30}
            onClick={() => {
              setSeeModal(!seeModal);
            }}
          />
        </div>
      </div>
      <PageContent seeSponsors={seeSponsors} />
    </Layout>
  );
}

const PageContent = ({ seeSponsors }: { seeSponsors: boolean }) => {
  if (seeSponsors) {
    return (
      <div className="justify-center text-center text-2xl">
        <SponsorContainer />
      </div>
    );
  } else {
  }

  return <></>;
};

const SponsorContainer = () => {
  const { data: sponsors, isLoading } = api.sponsor.getSponsorsIds.useQuery();
  console.log(sponsors);
  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (!sponsors || sponsors.length === 0) {
    return <p className="text-black">No hay sponsors D:</p>;
  }

  return (
    <div className="flex w-full flex-wrap flex-row justify-center">
      {sponsors?.map((sponsor) => (
        <SponsorWrapper key={sponsor.id} sponsorId={sponsor.id} />
      ))}
    </div>
  );
};

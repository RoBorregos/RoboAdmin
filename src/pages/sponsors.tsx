import Layout from "rbrgs/components/layout/Layout";
import { SponsorWrapper } from "rbrgs/components/sponsor/SponsorWrapper";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SponsorModal } from "rbrgs/components/sponsor/SponsorModal";
import { SponsorEdit } from "rbrgs/components/sponsor/SponsorEdit";
import { SearchBar } from "rbrgs/components/general/SearchBar";
import { SponsorPackWrapper } from "rbrgs/components/sponsorPacks/SponsorPackWrapper";
import { SponsorPackForm } from "rbrgs/components/sponsor/SponsorPackForm";

export default function SponsorsPage() {
  const [seeWindow, setSeeWindow] = useState("sponsors");
  const [seeModal, setSeeModal] = useState(false);

  const [search, setSearch] = useState("");

  let modalTitle = "undefined";
  if (seeWindow === "sponsors") {
    modalTitle = "Create Sponsor";
  } else if (seeWindow === "sponsorPacks") {
    modalTitle = "Create Sponsor Pack";
  } else if (seeWindow === "benefits") {
    modalTitle = "Create Benefit";
  }

  return (
    <Layout>
      {seeModal && (
        <SponsorModal title={modalTitle} setSeeModal={setSeeModal}>
          <CreateForm createType={seeWindow} />
        </SponsorModal>
      )}
      <div className="flex w-full flex-row flex-wrap justify-center">
        <div className="my-4 flex w-[80%] flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3">
          <AiOutlinePlusCircle
            size={30}
            onClick={() => {
              setSeeModal(!seeModal);
            }}
          />
          <button
            className="h-fit rounded-md bg-slate-200 p-2 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("sponsors");
            }}
          >
            See Sponsors
          </button>
          <button
            className="h-fit rounded-md bg-slate-200 p-2 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("sponsorPacks");
            }}
          >
            See Sponsor packs
          </button>
          {/* <button
            className="h-fit rounded-md bg-slate-200 p-2 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("benefits");
            }}
          >
            See Benefits
          </button> */}
          <SearchBar setSearch={setSearch} className="w-80" />
        </div>
      </div>
      <PageContent windowType={seeWindow} search={search} />
    </Layout>
  );
}

const CreateForm = ({ createType }: { createType: string }) => {
  if (createType === "sponsors") {
    return <SponsorEdit sponsor={undefined} />;
  } else if (createType === "sponsorPacks") {
    return <SponsorPackForm sponsorPack={undefined}/>;
  } else if (createType === "benefits") {
    return <></>;
    // return <BenefitEdit benefit={undefined} />;
  } else {
    return <p>Error: no se encontró el tipo especificado: {createType}</p>;
  }
};

const PageContent = ({
  windowType,
  search,
}: {
  windowType: string;
  search: string;
}) => {
  if (windowType === "sponsors") {
    return (
      <div className="justify-center text-center text-2xl">
        <SponsorContainer search={search} />
      </div>
    );
  } else if (windowType === "sponsorPacks") {
    return (
      <div className="justify-center text-center text-2xl">
        <SponsorPackContainer search={search} />
      </div>
    );
  } else if (windowType === "benefits") {
    return (
      <div className="justify-center text-center text-2xl">
        {/* <BenefitContainer search={search} /> */}
      </div>
    );
  }

  return <p>Error, no se encontró el tipo de ventana especificado</p>;
};

const SponsorContainer = ({ search }: { search: string }) => {
  const { data: sponsors, isLoading } = api.sponsor.getSponsorsIds.useQuery({
    search: search,
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (!sponsors || sponsors.length === 0) {
    return <p className="text-black">No hay sponsors D:</p>;
  }

  return (
    <div className="flex w-full flex-row flex-wrap justify-center">
      {sponsors?.map((sponsor) => (
        <SponsorWrapper key={sponsor.id} sponsorId={sponsor.id} />
      ))}
    </div>
  );
};

// const BenefitContainer = ({ search }: { search: string }) => {
//   const { data: benefits, isLoading } = api.sponsor.getBenefitsIds.useQuery({
//     search: search,
//   });

//   if (isLoading) {
//     return <p>Cargando...</p>;
//   } else if (!benefits || benefits.length === 0) {
//     return <p className="text-black">No hay beneficios registrados</p>;
//   }

//   return (
//     <div className="flex w-full flex-row flex-wrap justify-center">
//       {benefits?.map((benefit) => (
//         <BenefitWrapper key={benefit.id} benefitId={benefit.id} />
//       ))}
//     </div>
//   );
// };

const SponsorPackContainer = ({ search }: { search: string }) => {
  const { data: sponsorPacks, isLoading } =
    api.sponsor.getSponsorPacksIds.useQuery({
      search: search,
    });

  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (!sponsorPacks || sponsorPacks.length === 0) {
    return <p className="text-black">No hay sponsor packs D:</p>;
  }

  return (
    <div className="flex w-full flex-row flex-wrap justify-center">
      {sponsorPacks?.map((sponsorPack) => (
        <SponsorPackWrapper
          key={sponsorPack.id}
          sponsorPackId={sponsorPack.id}
        />
      ))}
    </div>
  );
};

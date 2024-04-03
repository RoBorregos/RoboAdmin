import Layout from "rbrgs/components/layout/Layout";
import { SponsorWrapper } from "rbrgs/components/sponsor/SponsorWrapper";
import {useRouter} from "next/router";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SponsorModal } from "rbrgs/components/sponsor/SponsorModal";
import { SponsorEdit } from "rbrgs/components/sponsor/SponsorEdit";
import { SearchBar } from "rbrgs/components/general/SearchBar";
import { SponsorPackWrapper } from "rbrgs/components/sponsorPacks/SponsorPackWrapper";
import { SponsorPackForm } from "rbrgs/components/sponsor/SponsorPackForm";
import { BiUpload, BiDownload } from "react-icons/bi";

export default function SponsorsPage() {
  const [seeWindow, setSeeWindow] = useState("sponsors");
  const [seeModal, setSeeModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const mutationFetch = api.sponsor.fetchSponsors.useMutation({
    onSuccess: (succeeded) => {
      if (typeof succeeded === "string") {
        alert("Error: " + succeeded);
      } else {
        if (succeeded) {
          alert("Sponsors fetched successfully!");
        } else {
          alert("Sponsors fetch failed.");
        }
      }
      router.reload();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const mutationUpload = api.sponsor.uploadToRepository.useMutation({
    onSuccess: (result) => {
      if (typeof result === "string") {
        alert(result);
      } 
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  let modalTitle = "undefined";
  if (seeWindow === "sponsors") {
    modalTitle = "Create Sponsor";
  } else if (seeWindow === "sponsorPacks") {
    modalTitle = "Create Sponsor Pack";
  }

  return (
    <Layout>
      {seeModal && (
        <SponsorModal title={modalTitle} setSeeModal={setSeeModal}>
          <CreateForm createType={seeWindow} />
        </SponsorModal>
      )}
      <div className="flex w-full flex-col flex-wrap items-center align-middle">
        <div className="my-4 flex w-[80%] flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3">
          <AiOutlinePlusCircle
            size={40}
            className="rounded-full p-1 duration-1000 hover:bg-slate-300"
            onClick={() => {
              setSeeModal(!seeModal);
            }}
          />
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("sponsors");
            }}
          >
            See Sponsors
          </button>
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("sponsorPacks");
            }}
          >
            See Sponsor packs
          </button>
          <SearchBar setSearch={setSearch} className="w-80" />
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-md bg-slate-300 p-2 duration-700 hover:bg-blue-400">
          <BiUpload size={30} className="duration-1000 hover:text-purple-800" 
          
          onClick={() => {
            if (confirm("Are you sure you want to upload sponsors?")) {
              mutationUpload.mutate();
            }
          }}
          
          />
          <BiDownload
            size={30}
            className="duration-1000 hover:text-purple-800"
            onClick={() => {
              if (confirm("Are you sure you want to fetch sponsors? (This will overwrite the current sponsors and reset to the last saved sponsors in the webpage)")) {
                mutationFetch.mutate({});
              }
            }}
          />
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
    return <SponsorPackForm sponsorPack={undefined} />;
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

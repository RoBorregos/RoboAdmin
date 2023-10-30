import Layout from "rbrgs/components/layout/Layout";
import { api } from "rbrgs/utils/api";
import { useState } from "react";
import { SearchBar } from "rbrgs/components/general/SearchBar";
import { SponsorHistoryCard } from "rbrgs/components/sponsor/SponsorHistoryCard";

export default function HistoryPage() {
  const [seeWindow, setSeeWindow] = useState("sponsorsH");
  const [search, setSearch] = useState("");

  return (
    <Layout title="RoboAdmin History">
      <div className="flex w-full flex-col flex-wrap items-center align-middle">
        <div className="my-4 flex w-[80%] flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3">
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("sponsorsH");
            }}
          >
            Sponsor History
          </button>
          <SearchBar setSearch={setSearch} className="w-80" />
        </div>
      </div>
      <PageContent windowType={seeWindow} search={search} />
    </Layout>
  );
}

const PageContent = ({
  windowType,
  search,
}: {
  windowType: string;
  search: string;
}) => {
  if (windowType === "sponsorsH") {
    return (
      <div className="justify-center text-center text-2xl">
        <SponsorHistoryContainer search={search} />
      </div>
    );
  }
  // Ejemplo de como agregar una nueva ventana
  //   else if (windowType === "sponsorPacks") {
  //     return (
  //       <div className="justify-center text-center text-2xl">
  //         <SponsorPackContainer search={search} />
  //       </div>
  //     );
  //   }

  return <p>Error, no se encontró el tipo de ventana especificado</p>;
};

const SponsorHistoryContainer = ({ search }: { search: string }) => {
  const { data: sponsorsHistoryIds, isLoading } =
    api.sponsor.getSponsorsHistory.useQuery({
      search: search,
    });

  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (
    !sponsorsHistoryIds ||
    sponsorsHistoryIds.length === 0
  ) {
    return <p className="text-black">No hay resultados</p>;
  }

  return (
    <div className="flex w-full flex-row flex-wrap justify-center">
      {sponsorsHistoryIds?.map((sponsorHId) => (
        <FetchSponsorHContainer key={sponsorHId.id} id={sponsorHId.id} />
      ))}
    </div>
  );
};

const FetchSponsorHContainer = ({ id }: { id: string }) => {
  const { data: sponsorHistory } = api.sponsor.getSponsorHistoryById.useQuery({
    id: id,
  });
  return <SponsorHistoryCard sponsorHistory={sponsorHistory} />;
};

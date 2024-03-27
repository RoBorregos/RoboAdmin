import AddMember from "rbrgs/components/editUser/addMember";
import MemberCard from "rbrgs/components/editUser/memberCard";
import SearchBar from "rbrgs/components/editUser/searchBar";
import { useState } from "react";
import { api } from "rbrgs/utils/api";
import SaveChanges from "rbrgs/components/editUser/saveChanges";
import Layout from "rbrgs/components/layout/Layout";

const Members = () => {
  const { data: members } = api.members.getMembers.useQuery();

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");

  const handleSearch = (value: string) => {
    if (value === "") {
      setSearch(false);
      setInput("");
      return;
    }
    setSearch(true);
    setInput(value);
  };

  // console.log(last.data);
  // const getMembers2 = async() => {
  //     const res = api.members.getMembers.useQuery();
  //     if (typeof res !== undefined)
  //         setMembers(res?.data);
  // }

  //     const fetchData = async () => {
  //         const response = await fetch('https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/data/members.json');
  //         const data = await response.json();
  //         setMembers(data.members);

  //         // console.log(data.members);

  //     //     for (let i = 0; i < members.length; i++) {
  //     //         const data = members[i];
  //     //         if (data !== undefined) {

  //     //             const def: Member = data;
  //     //             const id = def.id;
  //     //             const idNum = parseInt(id.toString());
  //     //             console.log();
  //     //         const res = await addMember.mutate({
  //     //             id: idNum,
  //     //             name: def.name || "",
  //     //             lastname: def.lastname || "",
  //     //             role: def.role || "",
  //     //             subtitle: def.subtitle || "",
  //     //             class: def.class || "",
  //     //             semesters: def.semesters || "",
  //     //             status: def.status || "",
  //     //             description: def.description || "",
  //     //             github: def.github || "",
  //     //             github_user: def.github_user || "",
  //     //             linkedin: def.linkedin || "",
  //     //             tags: def.tags || "",

  //     //     })

  //     // };

  //     // }
  // }

  // useEffect(() => {
  //     // fetchData();

  //     const result = getMembers.data?.map
  //     if (result !== undefined) {
  //         console.log(result);

  //         // setMembers(result.);
  //     }
  // }, []);

  return (
    <Layout title="RoboAdmin History">
      <div className="h-max bg-stone-900 p-5">
        <h1 className="py-3 text-2xl text-slate-100">Members</h1>
        <div className="flex">
          <SearchBar handleSearch={handleSearch} />
          <AddMember />
          <SaveChanges />
        </div>

        {search ? (
          <SearchContainer search={input} />
        ) : (
          <div className="mt-4 grid grid-cols-6 gap-2 md:grid-cols-7">
            {members?.map((member, key) => (
              <MemberCard key={key} member={member} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const SearchContainer = ({ search }: { search: string }) => {
  const { data: members, isLoading } =
    api.members.getFilteredMembers.useQuery(search);
  // console.log(members);

  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (!members || members.length === 0) {
    return <p className="text-white">No se encontraron resultados</p>;
  }

  return (
    <div className="mt-4 grid h-screen grid-cols-6 gap-2 overflow-scroll xl:grid-cols-8 2xl:grid-cols-10">
      {members && (
        <>
          {members.map((member, key) => (
            <MemberCard key={key} member={member} />
          ))}
        </>
      )}
    </div>
  );
};

export default Members;

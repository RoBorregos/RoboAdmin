import AddMember from "rbrgs/components/editUser/addMember";
import MemberCard from "rbrgs/components/editUser/memberCard";
import SearchBar from "rbrgs/components/editUser/searchBar";
import { useState } from "react";
import { api } from "rbrgs/utils/api";
import SaveChanges from "rbrgs/components/editUser/saveChanges";

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

    }

    return (

        <div className="p-5 bg-stone-900 h-max">
            <h1 className="text-2xl py-3 text-slate-100">
                Members
            </h1>
            <div className="flex">
                <SearchBar handleSearch={handleSearch} />
                <AddMember />
                <SaveChanges />
            </div>

            {search ? (
                <SearchContainer search={input} />
            ) : (
                <div className="grid grid-cols-6 xl:grid-cols-9 2xl:grid-flow-col-12 gap-2 mt-4">
                    {members?.map((member, key) => (
                        <MemberCard key={key} member={member} />
                    ))}
                </div>
            )}
        </div>
    );
}


const SearchContainer = ({ search }: { search: string }) => {
    const { data: members, isLoading } = api.members.getFilteredMembers.useQuery(search);
    // console.log(members);

    if (isLoading) {
        return <p className="text-white my-8">Loading...</p>;
    } else if (!members || members.length === 0) {
        return <p className="text-white">No se encontraron resultados</p>;
    }

    return (
        <div className="bg-stone-900 h-screen">

        <div className="bg-stone-900 grid grid-cols-6 xl:grid-cols-9 2xl:grid-flow-col-12 gap-2 mt-4">
            {members && (
                <>
                {members.map((member, key) => (
                    <MemberCard key={key} member={member} />
                ))}
                </>
            )}
        </div>
        </div>
    )
}

export default Members;
import AddMember from "rbrgs/components/editUser/addMember";
import MemberCard from "rbrgs/components/editUser/memberCard";
import SearchBar from "rbrgs/components/editUser/searchBar";
import { useEffect, useState } from "react";
import { api } from "rbrgs/utils/api";
import SaveChanges from "rbrgs/components/editUser/saveChanges";

const Members = () => {
    const getMembers = api.members.getMembers.useQuery();


    const [members, setMembers] = useState([]);
    
    // console.log(last.data);

    const fetchData = async () => {
        const response = await fetch('https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/data/members.json');
        const data = await response.json();
        setMembers(data.members);

        // console.log(data.members);

    //     for (let i = 0; i < members.length; i++) {
    //         const data = members[i];
    //         if (data !== undefined) {
                
                
    //             const def: Member = data;
    //             const id = def.id;
    //             const idNum = parseInt(id.toString());
    //             console.log();
    //         const res = await addMember.mutate({
    //             id: idNum,
    //             name: def.name || "",
    //             lastname: def.lastname || "",
    //             role: def.role || "",
    //             subtitle: def.subtitle || "",
    //             class: def.class || "",
    //             semesters: def.semesters || "",
    //             status: def.status || "",
    //             description: def.description || "",
    //             github: def.github || "",
    //             github_user: def.github_user || "",
    //             linkedin: def.linkedin || "",
    //             tags: def.tags || "",
            
    //     })
        
    // };
        
    // }
}

    useEffect(() => {
        // fetchData();
        const result = getMembers.data?.map
        if (result !== undefined) {
            console.log(result);
            
            // setMembers(result.);
        }
    }, []);

    return (

        <div className="p-5 bg-stone-900">
            <h1 className="text-2xl py-3 text-slate-100">
                Members
            </h1>
            <div className="flex">
                <SearchBar />
                <AddMember id="msm"/>
                <SaveChanges />
            </div>

            <div className="grid grid-cols-6 md:grid-cols-7 gap-2 mt-4">
                {getMembers.data?.map((member, key) => (
                        <MemberCard key={key} member={member} />
                ))}
            </div>
        </div>
    );
}

export default Members;
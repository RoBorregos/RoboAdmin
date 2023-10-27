import MemberCard from "rbrgs/components/editUser/memberCard";
import { useEffect, useState } from "react";

const Members = () => {

    const [members, setMembers] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/data/members.json');
        const data = await response.json();
        setMembers(data.members);
        // console.log(data.members);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div className="p-5">
            <h1 className="text-lg font-semibold py-3">
                Members
            </h1>

            <div>
                {members.map((member, key) => (
                    <button>
                        <MemberCard key={key} member={member} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Members;
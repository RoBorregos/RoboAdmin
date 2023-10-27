import { useState } from "react";
import EditUserModal from "./memberModal";
import Image from "next/image";

interface MemberCardProps {

    member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {

    const [image, setImage] = useState('');
    const name = member.name + " " + member.lastname;

    const fetchData = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/members/${member.id}.jpg`);
        // const data = await response.json();
        setImage(response.url);
        // console.log(response.url);
    }
    fetchData();

    const [openModal, setOpenModal] = useState(false);


    return (
        <div className="bg-slate-500 m-1">


            <button onClick={() => setOpenModal(!openModal)}>
                {name}
                <Image src={image} alt={member.name} width={200} height={200} />
            </button>
                <EditUserModal data={member} isOpen={openModal} />

        </div>
    )
}

export default MemberCard;
import { useState } from "react";
import Image from "next/image";
import Modal from "./modal";
import { api } from "rbrgs/utils/api";

interface MemberCardProps {
    member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    const addMember = api.members.addMember.useMutation();

    // const [image, setImage] = useState('');
    const name = member.name + " " + member.lastname;
    const image = `https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/members/${member.id}.jpg`;
    
    const fetchData = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/members/${member.id}.jpg`);
        // const data = await response.json();
        // setImage(response.url);

        // if (member !== undefined) {
        //         const str = `https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/members/${member.id}.jpg`;
                
        //         const def: Member = member;
        //         const id = def.id;
        //         const idNum = parseInt(id.toString());
        //         console.log();
        //     const res = await addMember.mutate({
        //         id: idNum,
        //         name: def.name || "",
        //         lastname: def.lastname || "",
        //         role: def.role || "",
        //         subtitle: def.subtitle || "",
        //         class: def.class || "",
        //         semesters: def.semesters || "",
        //         status: def.status || "",
        //         description: def.description || "",
        //         github: def.github || "",
        //         github_user: def.github_user || "",
        //         linkedin: def.linkedin || "",
        //         tags: def.tags || "",
        //         image: str,
                    
        //         })
                
        //     }
        // console.log(response.url);
    }
    // fetchData();

    const [openModal, setOpenModal] = useState(false);


    return (
        <div className="">
            <div onClick={() => setOpenModal(!openModal)} className="relative border-2 border-white">
                <div className="w-52 absolute overflow-clip text-white z-40 p-2 bottom-1 drop-shadow-2xl [text-shadow:_0_3px_3px_rgb(0_0_0_/_60%)]">
                    {name}
                </div>
                <div className="opacity-80 bg-black object-cover ">
                    <Image className="" src={image} alt={member.name} width={200} height={200} />
                </div>
            </div>
            <Modal data={member} isOpen={openModal} image={image}/>
        </div>
    )
}

export default MemberCard;
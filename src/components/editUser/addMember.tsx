import { AiOutlinePlus } from "react-icons/ai";
import NewMemberModal from "./newModal";
import { useState } from "react";


const AddMember = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <button onClick={() => setOpenModal(!openModal)} className="bg-blue-400 p-2 w-8 rounded-md text-white items-center justify-center h-8 text-center hover:bg-blue-500">
                <AiOutlinePlus className="" />
            </button>
            
            <NewMemberModal isOpen={openModal}/>
        </div>
    )
}

export default AddMember;
import { useState } from "react";
import EditUserModal from "./editModal";

const EditUser = () => {
    const [cell, setCell] = useState(true);
    return (
        <div className=" h-screen w-full">
            <button onClick={() => setCell(!cell)}>
                open
            </button>
            <EditUserModal id="1" isOpen={cell} />
            
        </div>
    )
}

export default EditUser;
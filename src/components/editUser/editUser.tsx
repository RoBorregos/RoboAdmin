import { useState } from "react";
import EditUserModal from "./memberModal";

const EditUser = () => {
    const [cell, setCell] = useState(true);

    return (
        <div className=" h-screen w-full">
            <button onClick={() => setCell(!cell)}>
                open
            </button>
            {/* <EditUserModal data =  isOpen={cell} /> */}

        </div>
    )
}

export default EditUser;
import { useState } from "react";

const EditUser = () => {
    const [cell, setCell] = useState(true);

    return (
        <div className=" h-screen w-full">
            <button onClick={() => setCell(!cell)}>
                open
            </button>

        </div>
    )
}

export default EditUser;
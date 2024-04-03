import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { api } from "rbrgs/utils/api";

const SaveChanges = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>

            <div onClick={() => setOpenModal(!openModal)} className="bg-blue-400 p-2 rounded-md text-white items-center ml-5 justify-center h-8 text-center hover:bg-blue-500">
                Save
            </div>
            <SaveModal isOpen={openModal} />
        </div>
    )
};


interface SaveProps {
    isOpen: boolean;

}
const SaveModal: React.FC<SaveProps> = ({ isOpen }) => {
    const update = api.githubApi.updateFileFromBranch.useMutation();
    // const dialog = document.getElementById(
    //     "111."
    // ) as HTMLDialogElement;
    const dialog = useRef<HTMLDialogElement>(null);
    const data = api.members.getMembers.useQuery();

    const handleSave = () => {
        
        const jsonRes = JSON.stringify(data.data);
        // console.log(jsonRes)
        const res = update.mutate({
            owner: "RoBorregos",
            repo: "roborregos-web",
            branch: "update/members",
            filePath: `src/data/members.json`,
            fileContent: jsonRes,
            commitMessage: "Update members",

        })
        console.log(res);
        alert("Saved");
    }

    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog id={"111."} ref={dialog}
            className={
                "z-50 w-3/4 fixed right-9 rounded-lg bg-zinc-700 p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40 "
            }
        >
            <div>
            <div className="text-white mb-4 pr-10">
                    Are you sure you want to delete the member?
                </div>
                <div className="flex">
                    <button onClick={() => dialog.current?.close()} className="bg-slate-400 p-2 flex rounded-md justify-center text-white hover:bg-slate-300">
                        Cancel
                    </button>

                    <button onClick={() => handleSave()} className="bg-blue-500 p-2 text-white rounded-md  items-center ml-5 ounded-md justify-center text-center hover:bg-blue-400">
                        Save
                    </button>
                </div>
                <button className="absolute p-2 right-3 top-3 text-white" onClick={() => dialog.current?.close()}>
                    <AiOutlineCloseCircle className="text-2xl" />
                </button>
            </div>
        </dialog>
    )
}
export default SaveChanges;
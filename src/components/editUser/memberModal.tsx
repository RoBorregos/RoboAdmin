import { useCallback, useEffect, useState } from "react";
import View from "./view";
import Edit from "./edit";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
    data: Member;
    isOpen: boolean;

}
type Variant = "EDIT" | "VIEW";
const EditUserModal: React.FC<Props> = ({ data, isOpen }) => {
    const dialog = document.getElementById(
        data.id.toString()
    ) as HTMLDialogElement;
    const [variant, setVariant] = useState<Variant>("VIEW");
    // const [open, setOpen] = useState(isOpen);

    const toggleVariant = useCallback(() => {
        if (variant == 'VIEW') {
            setVariant('EDIT');
        } else {
            setVariant('VIEW');
        }
    }, [variant]);


    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    // useEffect(() => {
    //     if (dialog == null) return;
    //     if (open) {
    //         dialog.showModal();
    //     } else {
    //         dialog.close();
    //     }
    // }, [open]);





    return (
        <>
            <dialog id={data.id.toString()}
                className={
                    "z-50 w-3/4 fixed right-9 rounded-lg bg-white p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40 "
                }
            >
                <div>

                    {variant == 'VIEW' ? (
                        <View handleClick={() => toggleVariant()} data={data} />

                    ) : (
                        <Edit handleClick={() => toggleVariant()} data={data} />
                        // <AuthForm onSubmit={() => toggleVariant()} userId={userId || "-1"} />
                    )}

                </div>
                <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-md" onClick={toggleVariant}>
                    {variant == 'VIEW' ? 'Edit' : 'View'}
                </button>
                <button className="absolute p-2 right-3 top-3" onClick={() => dialog.close()}>
                    <AiOutlineCloseCircle className="text-2xl" />
                </button>
            </dialog>
        </>
    )
}

export default EditUserModal;
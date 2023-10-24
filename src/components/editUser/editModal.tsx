import { useCallback, useState } from "react";
import View from "./view";

interface Props {
    id: string;
    isOpen: boolean;

}
type Variant = "EDIT" | "VIEW";
const EditUserModal: React.FC<Props> = ({ id, isOpen }) => {
    const [variant, setVariant] = useState<Variant>("VIEW");

    const toggleVariant = useCallback(() => {
        if (variant == 'VIEW') {
            setVariant('EDIT');
        } else {
            setVariant('VIEW');
        }
    }, [variant]);


    return (
        <>
            <dialog
                className={
                    "w-3/4 fixed right-9 rounded-lg bg-white p-5 shadow-lg shadow-cyan-500/50 " +
                    (isOpen ? "block backdrop-blur-3" : "hidden")
                }
                id={id}
            >
                <div>

                    {variant == 'VIEW' ? (
                        <View handleClick={() => toggleVariant()} userId={id || "-1"} />

                    ) : (
                        <div>a
                        </div>
                        // <AuthForm onSubmit={() => toggleVariant()} userId={userId || "-1"} />
                    )}

                </div>
                <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-md" onClick={toggleVariant}>
                    {variant == 'VIEW' ? 'Edit' : 'View'}
                </button>
            </dialog>
        </>
    )
}

export default EditUserModal;
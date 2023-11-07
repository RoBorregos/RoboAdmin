import { useCallback, useEffect, useState } from "react";
import View from "./view";
import Edit from "./edit";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MainButtons from "./toggle";

interface Props {
    data: Member;
    isOpen: boolean;
    image: string
}

type Variant = "EDIT" | "VIEW";

const Modal: React.FC<Props> = ({ data, isOpen, image }) => {
    const dialog = document.getElementById(
        data.id.toString()
    ) as HTMLDialogElement;
    const [variant, setVariant] = useState<Variant>("VIEW");

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


    return (
        <>
            <dialog id={data.id.toString()}
                className={
                    "z-50 w-3/4 fixed right-9 rounded-lg bg-zinc-700 p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40 "
                }
            >
                <MainButtons variant={variant} onClick={toggleVariant} />
                <div>

                    <div>

                        {variant == 'VIEW' ? (
                            <View handleClick={() => toggleVariant()} data={data} image={image}/>
                            
                            ) : (
                                <Edit handleClick={() => toggleVariant()} data={data} image={image} />
                                )}

                    </div>
                    
                    <button className="absolute p-2 right-3 top-3 text-white" onClick={() => dialog.close()}>
                        <AiOutlineCloseCircle className="text-2xl" />
                    </button>
                </div>
            </dialog>
        </>

    )
}

export default Modal;
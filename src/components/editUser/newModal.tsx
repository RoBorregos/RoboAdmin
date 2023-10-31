'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import View from "./view";
import Edit from "./edit";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import MainButtons from "./toggle";

interface Props {
    isOpen: boolean;
}

type Variant = "EDIT" | "VIEW";

const NewMemberModal: React.FC<Props> = ({ isOpen }) => {
    const dialog = useRef<HTMLDialogElement>(null);
    // const dialog = document.getElementById("idd") as HTMLDialogElement || null;

    // const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
    // // setDialog(document.getElementById("idd") as HTMLDialogElement);
    // useEffect(() => {
    //     setDialog(document.getElementById("idd") as HTMLDialogElement);
    // },[])

    const [open, setOpen] = useState(isOpen);
    const [variant, setVariant] = useState<Variant>("VIEW");

    const handleClick = () => {
        console.log("clicked");
    }

    const toggleVariant = useCallback(() => {
        if (variant == 'VIEW') {
            setVariant('EDIT');
        } else {
            setVariant('VIEW');
        }
    }, [variant]);

    // useEffect(() => {
    //     if (isOpen) {
    //         setOpen(true);
    //     } else {
    //         setOpen(false);
    //     }
    // }, [isOpen]);

    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <>  
            {isOpen && (
                <dialog id="idd" ref={dialog}
            
                className={
                    "z-50 w-3/4 fixed right-9 rounded-lg bg-zinc-700 p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40 overflow-scroll"
                }
            >
                <div>

                    <div>
           

                    <Edit handleClick={handleClick} add />

                    </div>
                    
                    <button className="absolute p-2 right-3 top-3 text-white" onClick={() => dialog.current?.close()}>
                        <AiOutlineCloseCircle className="text-2xl" />
                    </button>
                </div>
            </dialog>
            )}
            
           
        </>


    )
}

export default NewMemberModal;
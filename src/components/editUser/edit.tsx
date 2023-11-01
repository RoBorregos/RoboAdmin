import Input from "./input";
import Label from "./label";
import { Form, Formik } from 'formik';
import Name from "./name";
import { api } from "rbrgs/utils/api";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

interface EditProps {
    handleClick: () => void;
    data?: Member;
    image?: string
    add?: boolean;
}

interface FormValues {
    name: string,
    lastname: string,
    role: string,
    subtitle: string,
    class: string,
    semesters: string,
    status: string,
    description: string,
    github: string,
    github_user: string,
    linkedin: string,
    tags: string,


}

const Edit: React.FC<EditProps> = ({ handleClick, data, image, add }) => {
    const addMember = api.members.addMember.useMutation();
    const updateMember = api.members.updateMember.useMutation();
    const last = api.members.getLastMember.useQuery().data;
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        setOpen(!open);
    }

    const handleEdit = (values: FormValues) => {
        if (values) {
            if (add) {
                const prevId = last?.id || 0;
                const newId = prevId + 1;
                const img = `https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/images/members/${newId}.jpg`;
                addMember.mutate({
                    id: newId || 0,
                    name: values.name || "",
                    lastname: values.lastname || "",
                    role: values.role || "",
                    subtitle: values.subtitle || "",
                    class: values.class || "",
                    semesters: values.semesters || "",
                    status: values.status || "",
                    description: values.description || "",
                    github: values.github || "",
                    github_user: values.github_user || "",
                    linkedin: values.linkedin || "",
                    tags: values.tags || "",
                    image: img,
                });
            } else {

                updateMember.mutate({
                    id: data?.id || 0,
                    name: values.name || "",
                    lastname: values.lastname || "",
                    role: values.role || "",
                    subtitle: values.subtitle || "",
                    class: values.class || "",
                    semesters: values.semesters || "",
                    status: values.status || "",
                    description: values.description || "",
                    github: values.github || "",
                    github_user: values.github_user || "",
                    linkedin: values.linkedin || "",
                    tags: values.tags || "",
                });

            }
        }
    }

    return (
        <>
            <div className="h-full w-full p-6 overflow-scroll pb-16">
                <Name name={data?.name || ""} lastname={data?.lastname || ""} />
                <Formik
                    initialValues={{
                        name: data?.name,
                        lastname: data?.lastname,
                        role: data?.role,
                        subtitle: data?.subtitle,
                        class: data?.class,
                        semesters: data?.semesters,
                        status: data?.status,
                        description: data?.description,
                        github: data?.github,
                        github_user: data?.github_user,
                        linkedin: data?.linkedin,
                        tags: data?.tags,
                    }}

                    onSubmit={(values, actions) => {
                        handleEdit(values as FormValues);
                        setTimeout(() => {
                            alert("Updated");
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >

                    <Form>
                        <div className="flex flex-col gap-3">

                            {/* <div className="flex flex-col gap-3"> */}
                            <Input title="Name" id={"name"} data="" />
                            <Input title="Last name" id={"lastName"} data="" />

                            <Input title="Role" id={"role"} data={data?.role || ""} />
                            <Input title="Subtitle" id={"subtitle"} data={data?.subtitle || ""} />
                            <Input title="Class" id={"class"} data={data?.class || ""} />
                            <Input title="Semesters" id={"semesters"} data={data?.semesters || ""} />
                            <Input title="Status" id={"status"} data={data?.status || ""} />
                            <Input title="Description" id={"description"} data={data?.description || ""} component={"textArea"} />
                            <Input title="Github" id={"github"} data={data?.github || ""} />
                            <Input title="Github User" id={"github_user"} data={data?.github_user || ""} />
                            <Input title="Linkedin" id={"linkedin"} data={data?.linkedin || ""} />
                            <Input title="Tags" id={"tags"} data={data?.tags || ""} />
                        </div>
                        <button className="absolute right-8 bottom-5 bg-blue-400 self-center text-white rounded-md p-2" type="submit">Save</button>

                    </Form>

                </Formik>

                {!add && (
                    <button onClick={handleDelete} className="absolute left-10 bottom-5 bg-red-500 self-center mr-2 text-white rounded-md p-2" >
                        Delete
                    </button>

                )}



            </div>
            <ConfirmModal isOpen={open} id={data?.id} />
        </>
    )
}

interface SaveProps {
    isOpen: boolean;
    id: number | undefined;

}
const ConfirmModal: React.FC<SaveProps> = ({ isOpen, id }) => {
    const update = api.githubApi.updateFileFromBranch.useMutation();
    const deleteMember = api.members.deleteMember.useMutation();
    const deleteImg = api.githubApi.deleteFileFromBranch.useMutation();
    // const dialog = document.getElementById(
    //     "111."
    // ) as HTMLDialogElement;
    const dialog = useRef<HTMLDialogElement>(null);
    const data = api.members.getMembers.useQuery();

    const handleConfirm = () => {
        if (id !== undefined)
            deleteMember.mutate(
                id
            )

        deleteImg.mutate({
            owner: "RoBorregos",
            repo: "roborregos-web",
            branch: "update/members",
            filePath: `src/images/members/${id}.jpg`,
            commitMessage: "Delete member",
            token: "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"
        })


        alert("Removed");
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
                "z-50 w-1/4 fixed right-9 rounded-lg bg-zinc-700 p-5 shadow-lg shadow-cyan-500/50 backdrop:bg-slate-900 backdrop:opacity-40 "
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

                    <button onClick={() => handleConfirm()} className="bg-red-500 p-2 text-white rounded-md  items-center ml-5 ounded-md justify-center text-center hover:bg-red-400">
                        Delete
                    </button>
                </div>
                <button className="absolute p-2 right-3 top-3 text-white" onClick={() => dialog.current?.close()}>
                    <AiOutlineCloseCircle className="text-2xl" />
                </button>
            </div>
        </dialog>
    )
}


export default Edit;
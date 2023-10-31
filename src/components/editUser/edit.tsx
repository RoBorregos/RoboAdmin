import Input from "./input";
import Label from "./label";
import { Form, Formik } from 'formik';
import Name from "./name";
import { api } from "rbrgs/utils/api";

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
    const handleSubmit = (values: FormValues) => {
        console.log(values);
    }

    const handleEdit = (values: FormValues) => {
        if (values) {
            if (add) {
                addMember.mutate({
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
                    image: image || "",
                });
            } else {

            }
        }
    }

    return (
        <div className="h-full w-full p-6 overflow-scroll">
            <Name name={data?.name || ""} lastname={data?.lastname || ""}/>
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
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >

                <Form>
                    <div className="flex flex-col gap-3">
                        {add && (
                            <div className="flex flex-col gap-3">
                                <Input title="Name" id={"name"} data="" />
                                <Input title="Last name" id={"lastName"} data="" />
                            </div>
                        )}
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
                    <div className="w-full flex justify-end mt-4">
                        <button className="bg-blue-400 self-center text-white rounded-md p-2" type="submit">Save</button>
                    </div>
                </Form>

            </Formik>

        </div>
    )
}

export default Edit;
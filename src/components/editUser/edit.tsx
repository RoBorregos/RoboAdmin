import Input from "./input";
import Label from "./label";

interface EditProps {
    handleClick: () => void;
    data: Member;
}

const Edit: React.FC<EditProps> = ({ handleClick, data }) => {
    


    return (
        <div className="h-full w-full p-6">
            <h1 className="flex gap-2">
                <div>
                    {data.name}
                </div>
                <div>
                    {data.lastname}
                </div>



            </h1>
            <div className="flex flex-col px-10">
                <Input title="Role" data={data.role} />
                <Input title="Subtitle" data={data.subtitle} />
                <Input title="Class" data={data.class} />
                <Input title="Semesters" data={data.semesters} />
                <Input title="Status" data={data.status} />
                <Input title="Description" data={data.description} />
                <Input title="Github" data={data.github} />
                <Input title="Github User" data={data.github_user} />
                <Input title="Linkedin" data={data.linkedin} />
                <Input title="Tags" data={data.tags} />
            </div>

        </div>
    )
}

export default Edit;
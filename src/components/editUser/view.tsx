import Label from "./label";

interface ViewProps {
    handleClick: () => void;
    data: Member;
}

const View: React.FC<ViewProps> = ({ handleClick, data }) => {
    


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
                <Label title="Role" data={data.role} />
                <Label title="Subtitle" data={data.subtitle} />
                <Label title="Class" data={data.class} />
                <Label title="Semesters" data={data.semesters} />
                <Label title="Status" data={data.status} />
                <Label title="Description" data={data.description} />
                <Label title="Github" data={data.github} />
                <Label title="Github User" data={data.github_user} />
                <Label title="Linkedin" data={data.linkedin} />
                <Label title="Tags" data={data.tags} />
            </div>

        </div>
    )
}

export default View;
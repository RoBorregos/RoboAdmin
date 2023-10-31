import Label from "./label";
import Image from 'next/image';
import Name from "./name";
interface ViewProps {
    handleClick: () => void;
    data: Member;
    image: string;
}

const View: React.FC<ViewProps> = ({ handleClick, data, image }) => {



    return (
        <div className="h-full w-full p-6">
            <Name name={data.name} lastname={data.lastname}/>
            <div className="flex mb-4 w-full">
                <div className="w-full flex flex-col gap-2">
                    <Label title="Role" data={data.role || ""} />
                    <Label title="Subtitle" data={data.subtitle || ""} />
                    <Label title="Class" data={data.class || ""} />
                    <Label title="Semesters" data={data.semesters || ""} />
                    <Label title="Status" data={data.status} />
                    <Label title="Github User" data={data.github_user || ""} />
                    <Label title="Description" data={data.description || ""} />
                    <Label title="Github" data={data.github || ""} />
                    <Label title="Linkedin" data={data.linkedin || ""} />
                    <Label title="Tags" data={data.tags || ""} />
                </div>

                <div className="absolute right-12 ">
                    <Image className="h-auto border-2 border-white drop-shadow-md" src={image} alt={data.name} width={200} height={200} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                
            </div>

        </div>
    )
}

export default View;
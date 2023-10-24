import Label from "./label";

interface ViewProps {
    handleClick: () => void;
    userId: string;
}

const View: React.FC<ViewProps> = ({ handleClick, userId }) => {
    const data =
    {
        "name": "Diego",
        "lastname": "Garza",
        "status": "inactive",
        "role": "Software Development",
        "subtitle": "Founder & Alumni",
        "class": "2015",
        "semesters": "9",
        "description": "Founder of the RoBorregos robotics team and Selider alumni with an exchange program in Carnegie Mellon University. Passionate in empowering the latinx community through digital content in his YouTube channel and social media inspiring dreamers to improve every day with optimism and leadership. Empathy, honesty and persistence are the core values that drive his life. He believes that progress is achieved by helping the development, growth and education of others. Learn. Enjoy. Compete.",
        "github": "https://github.com/chhcd",
        "github_user": "chhcd",
        "linkedin": "https://www.linkedin.com/in/diego-garza-rodr%C3%ADguez-a45b2197/",
        "tags": "Founder, Programmer, Software, Legacy"
    }


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
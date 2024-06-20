interface NameProps {
    name: string;
    lastname: string;
}

const Name:React.FC<NameProps> = ({name, lastname}) => {
    return (
        <h1 className="flex gap-2 text-white text-xl">
                <div className="mb-8">
                    {name}
                </div>
                <div>
                    {lastname}
                </div>
        </h1>
    )
}

export default Name;
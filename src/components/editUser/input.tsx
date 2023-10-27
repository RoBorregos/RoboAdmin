interface InputProps {
    title: string;
    data: string;
}

const Input: React.FC<InputProps> = ({ title, data }) => {
    return (
        <div className="flex flex-row gap-1">
            <div className="text-sm w-1/12 text-slate-400">{title}</div>
            <input className="p-1" placeholder={data} />
        </div>
    )
}

export default Input;
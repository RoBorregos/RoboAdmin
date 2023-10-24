interface LabelProps {
    title: string;
    data: string;
}

const Label: React.FC<LabelProps> = ({ title, data }) => {
    return (
        <div className="flex flex-row gap-1">
            <div className="text-sm w-1/12 text-slate-400">{title}</div>
            <div className="text-base w-4/5 text-slate-900">{data}</div>
        </div>
    )
}

export default Label;
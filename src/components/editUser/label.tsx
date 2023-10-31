import clsx from 'clsx';

interface LabelProps {
    title: string;
    data: string;
    main?: boolean;
}

const Label: React.FC<LabelProps> = ({ title, data,  }) => {
    return (
        <div className="flex flex-row gap-1 w-full text-base">
            <div className={clsx(
                "text-sm text-white w-1/6"
                )}>
                {title}
            </div>
            <div className={clsx(
                "text-base text-slate-200 w-5/6"
                )}>{data}</div>
        </div>
    )
}

export default Label;
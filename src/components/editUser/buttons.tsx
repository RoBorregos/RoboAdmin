import clsx from "clsx";
import { IconType } from "react-icons";

interface buttonProps {
    label: string;
    icon: IconType;
    selected: boolean;
    onClick: () => void;
}

const Button: React.FC<buttonProps> = ({ label, icon: Icon, selected, onClick }) => {
    return (
        <div className={clsx(selected ? 'bg-gray-100' : 'bg-white text-gray-500', 'flex px-3 py-2 w-28 rounded-md justify-center')} onClick={onClick}>
            <Icon className="text-blue-400 font-bold self-center mr-2" onClick={onClick} />
            {label}
        </div>
    )
}

export default Button
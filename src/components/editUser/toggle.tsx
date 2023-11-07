import Button from './buttons';
import { AiOutlineEdit } from 'react-icons/ai'
import { LiaPagerSolid } from 'react-icons/lia'

interface buttonProps {
    variant: string;
    onClick: () => void;
    image?: boolean;
}

const MainButtons: React.FC<buttonProps> = ({ variant, onClick, image }) => {


    return (
        <div className="absolute top-0 w-full flex flex-col justify-center mt-5 gap-3">
            <div className='flex mx-auto bg-white p-1 rounded-md shadow-md'>
                <Button label={image ? "Image" : "View"} icon={LiaPagerSolid} selected={variant == (image ? "IMAGE" : "VIEW")} onClick={onClick} />
                <Button label="Edit" icon={AiOutlineEdit} selected={variant == "EDIT"} onClick={onClick} />
              
            </div>

        </div>
    )
}

export default MainButtons
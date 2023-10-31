import { SlDocs } from 'react-icons/sl'
import { BsChatRight } from 'react-icons/bs'
import { useCallback, useState } from 'react'
import Button from './buttons';
import { AiOutlineEdit } from 'react-icons/ai'
import { LiaPagerSolid } from 'react-icons/lia'

interface buttonProps {
    variant: string;
    onClick: () => void;
}

const MainButtons: React.FC<buttonProps> = ({ variant, onClick }) => {


    return (
        <div className="absolute top-0 w-full flex flex-col justify-center mt-5 gap-3">
            <div className='flex mx-auto bg-white p-1 rounded-md shadow-md'>
                <Button label="View" icon={LiaPagerSolid} selected={variant == "VIEW"} onClick={onClick} />
                <Button label="Edit" icon={AiOutlineEdit} selected={variant == "EDIT"} onClick={onClick} />
            </div>

        </div>
    )
}

export default MainButtons
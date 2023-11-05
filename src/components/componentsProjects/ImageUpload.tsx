
import React, { FC } from 'react'

interface ImageUploadProps {
    handleFileSelect: (file: File) => void;
};

const ImageUpload: FC<ImageUploadProps> = ({ handleFileSelect }) => {

    const handleOnChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const file = e.target.files?.[0];

        console.log(file);
        if (file) {
            handleFileSelect(file);
        }
    };


    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
            <input className="block mb-1 w-full text-sm  border  rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type='file'
                accept='image/*'
                onChange={(e) => {handleOnChange(e)}}

            />
        </div>
    )
}
export default ImageUpload
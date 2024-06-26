import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
    handleSearch: (input: string) => void;
}
const SearchBar:React.FC<SearchBarProps> = ({handleSearch}) => {
    const [input, setInput] = useState('');


    return (
        <div className="pr-5 w-3/4">
            <div className='flex flex-row justify-between rounded-lg bg-white px-1 max-h-18 w-full shadow-0'>
                    <button onClick={() => handleSearch(input)} className='text-blue-500  font-light ml-2 rounded-md py-1 pr-1'>
                        <IoSearch size={24} />
                    </button>
                <input className="rounded-full p-1 w-full max-h-18 bg-white text-gray-800 focus:text-gray-900 focus:outline-none" type="text" id="search" placeholder="Search" value={input} onChange={(e) => {
                    setInput(e.target.value)
                }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(input);
                        }
                    }}
                />


            </div>
        </div>
    )
}

export default SearchBar;
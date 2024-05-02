'use client';

import { IoSearch } from 'react-icons/io5'

interface Props {
    searchValue: string;
    handleChangeSearch: (value: string) => void;
}

export const InputSearch = ({ searchValue, handleChangeSearch }: Props) => (
    <div className="w-full rounded-lg bg-gray-200 p-5 ">
        <div className="flex">
            <div className="flex items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <IoSearch color='gray' size={20} />
            </div>
            <input
                value={searchValue}
                type="text"
                className="w-full bg-white pl-2 text-gray-700 font-semibold outline-0"
                placeholder="Search..."
                onChange={(e) => handleChangeSearch(e.currentTarget.value)} />
        </div>
    </div>
)


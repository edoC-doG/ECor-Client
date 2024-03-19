import React, { memo, useState } from 'react'
import icons from './../utils/icons';
import { colors } from '../utils/contants';


const { AiOutlineDown } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const [selected, setSelected] = useState([])
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
    }
    return (
        <div
            className='p-2 relative text-xs gap-6 border border-gray-800 text-gray-500 flex justify-between items-center'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize'>{name}</span>
            <AiOutlineDown />
            {activeClick === name && <div className='min-w-[150px] z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white'>
                {type === 'checkbox' && <div>
                    <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`${selected} selected`}</span>
                        <span className='underline cursor-pointer hover:text-main'>Reset</span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                        {colors.map((el, idx) => (
                            <div key={idx} className='flex items-center gap-4'>
                                <input
                                    type="checkbox"
                                    name={el}
                                    className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500'
                                    value={el}
                                    onClick={handleSelect}
                                    id={el}

                                />
                                <label
                                    htmlFor={el}
                                    className='capitalize text-gray-700'
                                >
                                    {el}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)
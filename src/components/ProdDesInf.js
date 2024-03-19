import React, { memo, useState } from 'react'
import { tabsProd } from '../utils/contants'

const activeStyles = ''
const notActiveStyles = ''

const ProdDesInf = () => {
    const [activedTab, setActivedTab] = useState(1)
    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {tabsProd.map((el, idx) => (
                    <span
                        className={`py-2 px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        key={idx}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full p-4 border'>
                {tabsProd.some(el => el.id === activedTab) && tabsProd.find(el => el.id === activedTab)?.content}
            </div>
        </div>
    )
}

export default memo(ProdDesInf)
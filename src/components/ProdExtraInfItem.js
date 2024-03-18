import React, { memo } from 'react'

const ProdExtraInfItem = ({ icons, title, sub }) => {
    return (
        <div className='flex items-center p-3 gap-4 mb-[10px] border'>
            <span className='flex justify-center items-center p-2 bg-gray-800 rounded-full text-white'>{icons}</span>
            <div className='flex flex-col text-sm text-gray-500'>
                <span className='font-medium'>{title}</span>
                <span className='text-xs'>{sub}</span>
            </div>
        </div>
    )
}

export default memo(ProdExtraInfItem)
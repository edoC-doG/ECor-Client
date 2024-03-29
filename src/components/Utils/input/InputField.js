import React, { memo } from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    return (
        <div className='w-full flex-col flex relative mb-2'>
            {value.trim() !== '' && <label
                htmlFor={nameKey}
                className='text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm'
            >
                {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>}
            <input
                type={type || 'text'}
                className='w-full px-4 py-2 mt-2 rounded-sm border placeholder:text-sm  placeholder:italic outline-none'
                placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields?.some(el => el.name === nameKey) && <small className='text-main italic '>{invalidFields?.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

export default memo(InputField)
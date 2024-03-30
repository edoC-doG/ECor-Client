import clsx from 'clsx'
import React, { memo } from 'react'

const Select = ({
    label,
    options = [],
    register,
    errors,
    id,
    validate,
    style,
    fullWidth,
}) => {
    return (
        <div className='flex flex-col gap-2'>
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>}
            <select className={clsx('form-select', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option value="">---CHOOSE----</option>
                {options?.map((el, idx) => (
                    <option key={idx} value={el.code}>
                        {el.value}
                    </option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Select)
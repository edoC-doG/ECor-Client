import React, { memo } from 'react'

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select
            value={value}
            onChange={e => changeValue(e.target.value)}
            className='form-select text-xs'
        >
            {options?.map(el => (
                <option key={el.id} value={el.value}>{el.text}</option>
            ))}
        </select>
    )
}

export default memo(InputSelect)
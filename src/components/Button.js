import React, { memo } from 'react'

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter, fw }) => {
    return (
        <button
            type='button'
            className={style ? style : `${fw ? 'w-full' : 'w-fit'} px-4 py-2 my-2 rounded-md text-white bg-main font-semibold`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {iconBefore}
            <span>{name}</span>
            {iconAfter}
        </button>
    )
}

export default memo(Button)
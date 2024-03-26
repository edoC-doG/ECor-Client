import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw }) => {
    return (
        <button
            type='button'
            className={style ? style : `${fw ? 'w-full' : 'w-fit'} px-4 py-2 my-2 rounded-md text-white bg-main font-semibold`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button)
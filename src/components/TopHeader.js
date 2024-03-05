import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const TopHeader = () => {
    return (
        <div
            className='w-full h-[38px] flex items-center justify-center bg-main'
        >
            <div
                className='w-main flex items-center justify-between text-white text-xs'
            >
                <span> ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                <Link to={path.LOGIN}>Sign in or Create Account</Link>
            </div>
        </div>
    )
}

export default memo(TopHeader)
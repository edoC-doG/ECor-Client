import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { getCurrentUser } from 'store/user/asyncAction'
import { useDispatch, useSelector } from 'react-redux';
import icons from 'utils/icons';
import { logout } from 'store/user/userSlice'

const { AiOutlineLogout } = icons

const TopHeader = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, current } = useSelector(state => state.user)

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrentUser())
        }, 300)

        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [dispatch, isLoggedIn])
    return (
        <div
            className='w-full h-[38px] flex items-center justify-center bg-main'
        >
            <div
                className='w-main flex items-center justify-between text-white text-xs'
            >
                <span> ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {isLoggedIn
                    ? <div className='flex gap-4 text-xs items-center'>
                        <span>{`Welcome, ${current?.lastName}  ${current?.firstName}`}</span>
                        <span
                            className='hover:rounded-full hover:bg-gray-200 cursor-pointer hover:text-main p-2'
                            onClick={() => dispatch(logout())}
                        >
                            <AiOutlineLogout size={18} />
                        </span>
                    </div>
                    : <Link
                        className='hover:text-gray-800'
                        to={path.LOGIN}
                    >
                        Sign in or Create Account
                    </Link>
                }
            </div>
        </div >
    )
}

export default memo(TopHeader)
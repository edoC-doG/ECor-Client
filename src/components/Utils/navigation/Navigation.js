import React from 'react'
import { navigation } from 'utils/contantsFiel'
import { NavLink } from 'react-router-dom'


const Navigation = () => {
    return (
        <div className='w-main flex items-center h-[48px] py-2 border-y text-sm'>
            {navigation.map(el => (
                <NavLink
                    to={el.path}
                    key={el.id}
                    className={({ isActive }) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}                >
                    {el.value}
                </NavLink>
            ))}
        </div>
    )
}

export default Navigation
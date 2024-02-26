import React from 'react'
import { Header, Banner, Navigation, Sidebar } from '../../components'

const Home = () => {
    return (
        <div className='w-main flex'>
            <div className='w-[30%] flex flex-auto flex-col gap-5'>
                <Sidebar />
                <span>Deal Daily</span>
            </div>
            <div className='w-[70%] flex flex-auto flex-col gap-5 pl-5'>
                <Sidebar />
                <span>Best Seller</span>
            </div>
        </div>
    )
}

export default Home
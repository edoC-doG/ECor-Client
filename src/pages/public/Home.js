import React from 'react'
import { Header, Banner, Navigation, Sidebar } from '../../components'

const Home = () => {
    return (
        <div className='w-main flex'>
            <div className='w-[25%] flex flex-auto flex-col gap-5 border'>
                <Sidebar />
                <span>Deal Daily</span>
            </div>
            <div className='w-[75%] flex flex-auto flex-col gap-5 pl-5 border'>
                <Banner />
                <span>Best Seller</span>
            </div>
        </div>
    )
}

export default Home
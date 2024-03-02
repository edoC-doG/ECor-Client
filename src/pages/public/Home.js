import React from 'react'
import { Banner, Sidebar, BestSeller } from '../../components'


const Home = () => {
    return (
        <>
            <div className='w-main flex'>
                <div className='w-[25%] flex flex-auto flex-col gap-5 '>
                    <Sidebar />
                    <span>Deal Daily</span>
                </div>
                <div className='w-[75%] flex flex-auto flex-col gap-5 pl-5 '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    )
}

export default Home
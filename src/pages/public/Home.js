import React from 'react'
import { Banner, Sidebar, BestSeller, DealDaily, FeatureProduct, CustomSlider } from '../../components'
const settings = {
    dots: true,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}
const Home = () => {
    return (
        <>
            <div className='w-main flex'>
                <div className='w-[25%] flex flex-auto flex-col gap-5 '>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='w-[75%] flex flex-auto flex-col gap-5 pl-5 '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8'>
                <FeatureProduct />
            </div>
            <div className='my-8'>
                <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                    New Arrivals
                </h3>
                <div className='w-full' l>
                    <CustomSlider />
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    )
}

export default Home
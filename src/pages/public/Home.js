import React, { useEffect } from 'react'
import { Header, Banner, Navigation, Sidebar } from '../../components'
import { apiGetProducts } from './../../apis/product';

const Home = () => {
    const fetchProducts = async () => {
        const res = await apiGetProducts()
        console.log(res)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-main flex'>
            <div className='w-[25%] flex flex-auto flex-col gap-5 '>
                <Sidebar />
                <span>Deal Daily</span>
            </div>
            <div className='w-[75%] flex flex-auto flex-col gap-5 pl-5 '>
                <Banner />
                <span>Best Seller</span>
            </div>
        </div>
    )
}

export default Home
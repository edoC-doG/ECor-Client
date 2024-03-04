import React, { useEffect, useState } from 'react'
import { apiGetProducts } from './../apis/product';
import { apiGetCategories } from './../apis/app';
import CustomSlider from './CustomSlider';

const tabs = [
    {
        id: 1,
        name: 'Best Seller'
    },
    {
        id: 2,
        name: 'New Arrivals'
    },
]

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activeTab, setActiveTab] = useState(1)
    const [products, setProducts] = useState(null)
    const fetchProducts = async () => {
        const res = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetCategories({ sort: '-createdAt' })])
        if (res[0]?.success) {
            setBestSeller(res[0].products)
            setProducts(res[0].products)
        }
        if (res[1]?.success) setNewProducts(res[1].products)
        setProducts(res[0].products)
    }
    // useEffect(() => {
    //     fetchProducts()
    // }, [])
    useEffect(() => {
        if (activeTab === 1) {
            setProducts(bestSeller)
        } else {
            setProducts(newProducts)
        }
    }, [activeTab])
    return (
        <div>
            <div className='flex text-[20px] border-main ml-8'>
                {tabs.map(el => (
                    <span
                        key={el.id}
                        className={`${activeTab === el.id ? 'text-gray-950' : ''} font-semibold capitalize border-r px-8 text-gray-400 cursor-pointer`}
                        onClick={() => setActiveTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-b-2 border-main pt-4'>
                <CustomSlider products={products} activeTab={activeTab} />
            </div>
            <div className='w-full flex gap-4 mt-8'>
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className='flex-1 object-contain'
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className='flex-1 object-contain'
                />
            </div>
        </div>
    )
}

export default BestSeller
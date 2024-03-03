import React, { useEffect, useState } from 'react'
import { apiGetProducts } from './../apis/product';
import { apiGetCategories } from './../apis/app';
import Slider from "react-slick"
import ProductItem from './ProductItem';

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

const settings = {
    dots: true,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

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
                <Slider {...settings}>
                    {products?.map(el => (
                        <ProductItem
                            key={el.id}
                            productData={el}
                            isNew={activeTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller
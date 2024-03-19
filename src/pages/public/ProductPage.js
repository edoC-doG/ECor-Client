import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BreadCrumbs, ProductItem, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css'
import { productSlice } from './../../store/products/productSlice';
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
}

const ProductPage = () => {
    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)
    const fetchProdByCate = async (queries) => {
        const res = await apiGetProducts(queries)
        if (res.success) setProducts(res.products)
    }
    const { category } = useParams()
    useEffect(() => {
        //fetchProdByCate()
    }, [])
    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])
    return (
        <div className='w-full'>
            <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{category}</h3>
                    <BreadCrumbs category={category} />
                </div>
            </div>
            <div className='w-main flex justify-between m-auto border mt-8 p-4'>
                <div className='w-4/5 flex-auto flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Filter by</span>
                    <div className='flex items-center gap-4'>
                        <SearchItem
                            name='Price'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='input'
                        />
                        <SearchItem
                            name='Color'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='checkbox'
                        />
                    </div>
                </div>
                <div className='w-1/5 flex'>
                    Sort By
                </div>
            </div>
            <div className='mt-8 w-main m-auto'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.map((el) => (
                        <ProductItem
                            key={el.id}
                            pid={el.id}
                            productData={el}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default ProductPage
import React from 'react'
import { formatMoney } from '../utils/helper'
import label from '../assets/label.webp'
import labelBlue from '../assets/labelBlue.png'

const ProductItem = ({ productData, isNew }) => {
    return (
        <div className='w-full text-base border px-[10px]'>
            <div className='w-full border p-[15px] flex-col flex items-center'>
                <div className='w-full relative'>
                    <img
                        src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                        alt="Images"
                        className='w-[243px] h-[243px] object-cover'
                    />
                    <img
                        src={isNew ? label : labelBlue}
                        alt=""
                        className={`absolute w-[120px] top-[-32px] left-[-42px] h-[35px] object-contain `}
                    />
                    <span className={`font-bold absolute top-[-10px] left-[-12px] text-white ${isNew ? "" : "text-sm"}`}>{isNew ? "News" : "Trending"}</span>
                </div>
                <div className='flex flex-col gap-2 mt-[15px] items-start gap-1 w-full'>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem  
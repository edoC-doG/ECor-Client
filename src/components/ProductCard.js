import React from 'react'
import { formatMoney, renderStarFromNumber, secondsToHms } from '../utils/helper'

const ProductCard = ({ price, totalRatings, title, thumb }) => {
    return (
        <div className='w-1/3 flex-auto flex px-[10px] mb-[20px]'>
            <div className='w-full flex border'>
                <img
                    src={thumb}
                    alt='products'
                    className='w-[90px] object-contain p-4'
                />
                <div className='w-full flex flex-col items-start gap-1 mt-[15px] text-xs  '>
                    <span className='line-clamp-1 lowercase text-sm'>{title?.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings, 20)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>100,000 VNĐ</span>
                    {/* <span>{`${formatMoney(dealDaily?.price)} VNĐ`}</span> */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
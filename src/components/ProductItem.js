import React, { useState } from 'react'
import { formatMoney, renderStarFromNumber } from '../utils/helper'
import label from '../assets/new.png'
import labelBlue from '../assets/trending.png'
import { SelectOption } from '../components'
import icons from './../utils/icons';

const { AiFillEye, IoMenu, BsFillSuitHeartFill } = icons

const ProductItem = ({ productData, isNew }) => {
    const [isShowOption, setIsShowOption] = useState(false)
    return (
        <div className='w-full text-base border px-[10px]'>
            <div
                className='w-full border p-[15px] flex-col flex items-center gap-2'
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 bg-red-500 flex justify-center animate-slide-top'>
                        <SelectOption icon={<AiFillEye />} />
                        <SelectOption icon={<IoMenu />} />
                        <SelectOption icon={<BsFillSuitHeartFill />} />
                    </div>}
                    <img
                        src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                        alt="Images"
                        className='w-[274px] h-[274px] object-cover'
                    />
                    <img
                        src={isNew ? label : labelBlue}
                        alt=""
                        className={`absolute w-[100px] h-[35px] top-0 right-0 object-cover `}
                    />

                </div>
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem  
import React from 'react'

const ProductItem = ({ productData }) => {
    return (
        <div className='w-1/3'>
            <img src={productData?.images[0] || ''} alt="Images" className='w-[243px] h-[143px] object-cover' />
        </div>
    )
}

export default ProductItem
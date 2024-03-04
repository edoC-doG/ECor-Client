import React, { memo } from 'react'
import Slider from "react-slick"
import ProductItem from './ProductItem';

const settings = {
    dots: true,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}
const CustomSlider = ({ products, activeTab }) => {
    return (
        <>
            {
                products && <Slider {...settings}>
                    {products?.map(el => (
                        <ProductItem
                            key={el.id}
                            pid={el.id}
                            productData={el}
                            isNew={activeTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            }
        </>
    )
}

export default memo(CustomSlider)
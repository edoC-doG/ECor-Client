import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetCategories, apiGetProducts } from '../../apis'
import { BreadCrumbs, Button, CustomSlider, ProdDesInf, ProdExtraInfItem, SelectQuantityPro } from '../../components'
import Slider from "react-slick"
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStarFromNumber } from '../../utils/helper'
import { toast } from 'react-toastify';
import { prodExtraInf } from '../../utils/contants'
const settings = {
    dots: true,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

const DetailProduct = () => {
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [relatedProd, setRelatedProd] = useState(null)
    const fetchProductData = async () => {
        const res = await apiGetCategories(pid)
        if (res.success) {
            setProduct(res.productData)
        }
    }
    const fetchProducts = async () => {
        const res = await apiGetProducts({ category })
        if (res.success) {
            setRelatedProd(res.products)
        }
    }
    useEffect(() => {
        // if(pid) fetchProductData()
        //fetchProducts()
    }, [pid])

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else setQuantity(number)
    }, [quantity])

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) toast.warning('Do not buy item has quantity equal than 0')
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])
    return (
        <div className='w-full'>
            <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold'>{title}</h3>
                    <BreadCrumbs title={title} category={category} />
                </div>
            </div>
            <div className='w-main m-auto mt-4 flex'>
                <div className='flex-col flex gap-4 w-2/5'>
                    <div className='h-[458px] w-[458px] border'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: product?.thumb
                            },
                            largeImage: {
                                src: product?.thumb,
                                width: 1800,
                                height: 1500
                            }
                        }} />
                    </div>
                    {/* <img src={product?.images} alt='product' className='h-[458px] w-[458px] border object-cover' /> */}
                    <div className='w-[458px]'>
                        <Slider className='image-slider flex gap-2 justify-between' {...settings}>
                            {product?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img src={el} alt='sub-product' className='w-[143px] border object-contain' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 pr-6 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(formatPrice(product?.price))} VND`}</h2>
                        <span className='text-sm text-main'>{`Storage: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, idx) => (<span key={idx}>
                            {el}
                        </span>))}
                        <span className='text-sm text-main italic'>{`Sold: ${product?.sold}`}</span>
                    </div>
                    <ul className='list-square text-sm text-gray-600 pl-3'>
                        {product?.description?.map(el => (<li className='leading-4' key={el}>{el}</li>))}
                    </ul>
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold'>Quantity</span>
                            <SelectQuantityPro
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button fw>
                            Add to cart
                        </Button>
                    </div>
                </div>
                <div className='w-1/5   '>
                    {prodExtraInf?.map(el => (
                        <ProdExtraInfItem
                            key={el.id}
                            title={el.title}
                            sub={el.sub}
                            icons={el.icons}
                        />
                    ))}
                </div>
            </div>
            <div className='w-main m-auto mt-8'>
                <ProdDesInf />
            </div>
            <div className='w-main m-auto mt-8'>
                <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                    Other customer also liked
                </h3>
                <CustomSlider products={relatedProd} normal={true} />
            </div>
            <div className='h-[500px] w-full'></div>
        </div >
    )
}

export default DetailProduct
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from 'apis'
import { BreadCrumbs, Button, CustomSlider, ProdDesInf, ProdExtraInfItem, SelectQuantityPro } from 'components'
import Slider from "react-slick"
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStarFromNumber } from 'utils/helper'
import { toast } from 'react-toastify';
import { prodExtraInf } from 'utils/contantsFiel'
import DOMPurify from 'dompurify'
const settings = {
    dots: false,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

const DetailProduct = () => {
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [update, setUpdate] = useState(false)
    const [currentImg, setCurrentImg] = useState('https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png')
    const [relatedProd, setRelatedProd] = useState(null)
    const fetchProductData = async () => {
        const res = await apiGetProduct(pid)
        if (res.success) {
            setProduct(res.productData)
            setCurrentImg(res?.productData?.thumb)
        }
    }
    const fetchProducts = async () => {
        const res = await apiGetProducts({ category })
        if (res.success) {
            setRelatedProd(res.products)
        }
    }

    const reRender = useCallback(() => {
        setUpdate(prev => !prev)
    }, [])
    useEffect(() => {
        if (pid) {
            fetchProductData()
            fetchProducts()
        }
        window.scrollTo(0, 0)
    }, [pid])

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else setQuantity(number)
    }, [quantity])

    const handleSwapImg = (e, el) => {
        e.stopPropagation()
        setCurrentImg(el)
    }
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) {
            toast.warning('Do not buy item has quantity equal than 0')
            return
        }
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    useEffect(() => {
        if (pid) fetchProductData()
    }, [update])
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
                    <div className='h-[458px] w-[458px] flex items-center border object-cover overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: currentImg
                            },
                            largeImage: {
                                src: currentImg,
                                width: 1800,
                                height: 1500
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        <Slider
                            className='image-slider flex justify-between' {...settings}
                        >
                            {product?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img
                                        src={el}
                                        alt='sub-product'
                                        onClick={(e) => handleSwapImg(e, el)}
                                        className='h-[143px] border object-cover cursor-pointer'
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 pr-6 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(formatPrice(product?.price))} VND`}</h2>
                        <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, idx) => (<span key={idx}>
                            {el}
                        </span>))}
                        <span className='text-sm text-main italic'>{`Sold: ${product?.sold} pieces`}</span>
                    </div>
                    <ul className='list-square text-sm text-gray-600 pl-3'>
                        {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-4' key={el}>{el}</li>))}
                        {product?.description?.length === 1 &&
                            <div
                                className='text-sm line-clamp-[10] mb-8'
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}>
                            </div>}
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
                <ProdDesInf
                    total={product?.totalRatings}
                    ratings={product?.ratings || []}
                    nameProduct={product?.title}
                    pid={pid}
                    reRender={reRender}
                />
            </div>
            <div className='w-main m-auto my-12 '>
                <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                    Other customer also liked
                </h3>
                <CustomSlider products={relatedProd} normal={true} />
            </div>
        </div >
    )
}

export default DetailProduct
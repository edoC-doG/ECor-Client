import { apiGetProducts } from 'apis'
import clsx from 'clsx'
import { InputForm, Pagination } from 'components'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { formatMoney, formatPrice, generateRange } from 'utils/helper'



const ManagerProduct = () => {
    const [product, setProduct] = useState(null)
    const [params] = useSearchParams()
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [counts, setCounts] = useState(0)
    const fetchProducts = async (params) => {
        const res = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (res.success) {
            setProduct(res.products)
            setCounts(res.counts)
        }

    }
    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchProducts(searchParams)
    }, [params])
    const handleSearchProducts = () => {

    }
    return (
        <div className={clsx('w-full flex flex-col gap-4 p-4 relative')}>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0'>
                <h2 className='text-3xl font-bold tracking-tight'>Manage products</h2>
            </div>
            <div className='flex w-full justify-end items-center '>
                <form className='w-[45%]' onSubmit={handleSubmit(handleSearchProducts)}>
                    <InputForm
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search products'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white '>
                        <th className='text-center py-2'>Order</th>
                        <th className='text-center py-2'>Thumb</th>
                        <th className='text-center py-2'>Title</th>
                        <th className='text-center py-2'>Brand</th>
                        <th className='text-center py-2'>Category</th>
                        <th className='text-center py-2'>Price</th>
                        <th className='text-center py-2'>Quantity</th>
                        <th className='text-center py-2'>Sold</th>
                        <th className='text-center py-2'>Color</th>
                        <th className='text-center py-2'>Ratings</th>
                        <th className='text-center py-2'>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((el, idx) => (
                        <tr key={idx} className='border-b'>
                            <td className='text-center py-2'>{idx + 1}</td>
                            <td className='text-center py-2'>
                                <img src={el?.thumb} alt="thumb" className='w-12 h-12 object-cover' />
                            </td>
                            <td className='text-center py-2'>{el?.title}</td>
                            <td className='text-center py-2'>{el?.brand}</td>
                            <td className='text-center py-2'>{el?.category}</td>
                            <td className='text-center py-2'>{`${formatMoney(formatPrice(el?.price))} VND`}</td>
                            <td className='text-center py-2'>{el?.quantity}</td>
                            <td className='text-center py-2'>{el?.sold}</td>
                            <td className='text-center py-2'>{el?.color}</td>
                            <td className='text-center py-2'>{el?.totalRatings}</td>
                            <td className='text-center py-2'>{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination
                    totalCount={counts}
                    cure
                    title={'products'}
                />
            </div>
        </div>
    )
}

export default ManagerProduct
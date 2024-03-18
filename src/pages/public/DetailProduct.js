import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetCategories } from '../../apis'
import { BreadCrumbs } from '../../components'

const DetailProduct = () => {

    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const fetchProductData = async () => {
        const res = await apiGetCategories(pid)
        if (res.success) {
            setProduct(res.productData)
        }
    }
    useEffect(() => {
        // if(pid) fetchProductData()
    }, [pid])
    return (
        <div className='w-full'>
            <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <h3>{title}</h3>
                <BreadCrumbs title={title} category={category} />
            </div>
        </div>
    )
}

export default DetailProduct
import React, { useState, useEffect } from 'react'
import { apiGetCategories } from './../apis/app';


const Sidebar = () => {
    const [categories, setCategories] = useState(null)
    const fetchCategories = async () => {
        const res = await apiGetCategories()
        if (res?.success) setCategories(res.getProductCategory)
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    console.log(categories)
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar
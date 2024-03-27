import { apiGetUser } from 'apis'
import React, { useEffect } from 'react'

const ManagerUser = () => {
    const fetchUsers = async (params) => {
        const res = await apiGetUser(params)
        console.log(res)
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div>ManagerUser</div>
    )
}

export default ManagerUser
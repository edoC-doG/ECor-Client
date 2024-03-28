import { apiGetUser } from 'apis'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { role } from 'utils/contants'
import moment from 'moment'
import useDebounce from 'hooks/useDebounce'
import { Button, InputField, Pagination } from 'components'
import { useSearchParams } from 'react-router-dom'

const ManagerUser = () => {
    const [users, setUsers] = useState(null)
    const [querySearch, setQuerySearch] = useState({
        q: ""
    })
    const [params] = useSearchParams()
    const fetchUsers = async (data) => {
        const res = await apiGetUser({ ...data, limit: process.env.REACT_APP_LIMIT })
        if (res.success) setUsers(res)
    }
    const queriesDebounce = useDebounce(querySearch.q, 1000)

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) queries.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params])
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Manage users</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={querySearch.q}
                        setValue={setQuerySearch}
                        style={`w-[500px]`}
                        placeholder='Search User'
                        isShowLabel
                    />
                </div>
                <table className='table-auto mb-6 text-left w-full'>
                    <thead className='font-bold bg-gray-700 text-[13px]  text-white'>
                        <tr className='border border-gray-500'>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>FullName</th>
                            <th className='px-4 py-2'>Role</th>
                            <th className='px-4 py-2'>Phone</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Create At</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users?.map((el, idx) => (
                            <tr key={idx} className='border border-gray-500'>
                                <td className='py-2 px-4'>{idx + 1}</td>
                                <td className='py-2 px-4'>{el.email}</td>
                                <td className='py-2 px-4'>{`${el.lastName} ${el.firstName}`}</td>
                                <td className='py-2 px-4'>{role.find(item => +item.code === +el.role)?.value}</td>
                                <td className='py-2 px-4'>{el.mobile}</td>
                                <td className='py-2 px-4'>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                                <td className='py-2 px-4'>{moment(el.createAt).format('DD/MM/YYYY')}</td>
                                <td className='py-2 px-4'>
                                    <div className=' flex justify-center items-center gap-2'>
                                        <Button
                                            style={`px-4 py-2 my-2 rounded-md text-white bg-blue-700 font-semibold`}
                                        >Edit</Button>
                                        <Button>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full text-right p-4'>
                <Pagination
                    title={'users'}
                    totalCount={users?.counts}
                />
            </div>
        </div>
    )
}

export default memo(ManagerUser)
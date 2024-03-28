import React, { memo } from 'react'
import usePagination from 'hooks/usePagination'
import { PagiItem } from 'components'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount, title }) => {
    const [params] = useSearchParams()

    const pagination = usePagination(totalCount, 2)
    const range = (page) => {
        const currentPage = +params.get('page')
        const pageSize = +process.env.REACT_APP_LIMIT || 10
        const start = ((currentPage - 1) * pageSize) + 1
        const end = Math.min(currentPage * pageSize, totalCount)
        return `${start} - ${end}`
    }
    return (
        <div className='flex w-full justify-between items-center'>
            {!+params.get('page') && <span className='text-sm italic'>{`Show ${title} 1 - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount) || 10}`}</span>}
            {+params.get('page') && <span className='text-sm italic'>{`Show ${title} ${range()} of ${totalCount}`}</span>}
            <div className='flex items-center'>
                {pagination?.map((el, idx) => (
                    <PagiItem key={idx}>
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)


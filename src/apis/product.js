import axios from '../axios'

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})

export const apiRatings = (params) => axios({
    url: '/product/ratings',
    method: 'put',
    params
})

export const apiCreateProd = (data) => axios({
    url: '/product/',
    method: 'post',
    data
})
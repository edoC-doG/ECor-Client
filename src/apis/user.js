import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true
})
export const apiFinalRegister = (token) => axios({
    url: '/user/final-register/' + token,
    method: 'post',
})
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiForgotPwd = (data) => axios({
    url: '/user/forgotPassword',
    method: 'post',
    data
})

export const apiResetPwd = (data) => axios({
    url: '/user/resetPassword',
    method: 'put',
    data
})
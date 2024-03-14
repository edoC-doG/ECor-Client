import React, { useCallback, useState } from 'react'
import login from '../../assets/login.jpg'
import { Button, InputField } from '../../components'
import { apiRegister, apiLogin, apiForgotPwd } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { registerV2 } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isRegister, setRegister] = useState(false)
    const [isForgotPwD, setIsForgotPwD] = useState(false)
    const [email, setEmail] = useState(null)
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        mobile: '',
        firstName: '',
        lastName: ''
    })
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            mobile: '',
            firstName: '',
            lastName: ''
        })
    }
    const handleSubmit = useCallback(async () => {
        const { firstName, lastName, mobile, ...data } = payload
        if (isRegister) {
            const res = await apiRegister(payload)
            if (res.success) {
                Swal.fire('Register Successfully ', res.mes, 'success').then(() => {
                    setRegister(false)
                    resetPayload()
                })
            } else Swal.fire('Oops!', res.mes, 'error')
        } else {
            const rs = await apiLogin(data)
            if (rs.success) {
                dispatch(registerV2({ isLoggedIn: true, userData: rs.userData, token: rs.accessToken }))
                navigate(`/${path.HOME}`)
            } else Swal.fire('Oops!', rs.mes, 'error')
        }
    }, [payload, isRegister])
    const handleForgotPwd = async () => {
        const res = await apiForgotPwd({ email })
        if (res.success) {
            toast.success(res.mes)
        } else toast.error(res.mes)
    }
    return (
        <div className='w-screen h-screen relative'>
            {isForgotPwD && <div className='absolute top-0 left-0 bottom-0 right-0 animate-slide-right bg-white flex flex-col items-center py-8 z-50'>
                <div className=' flex flex-col gap-4'>
                    <label htmlFor="email">Enter your email:</label>
                    <input
                        type="text"
                        id='email'
                        className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                        placeholder='Exp: email@gmail.com'
                        value={email || ""}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='w-full flex items-center justify-end gap-4'>
                        <Button
                            name='Submit'
                            handleOnClick={handleForgotPwd}
                            style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                        />
                        <Button
                            name='Back'
                            handleOnClick={() => setIsForgotPwD(false)}
                        />
                    </div>
                </div>
            </div>}
            <img
                src={login}
                alt="Login Page"
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center'>
                <div className='min-w-[500px] flex flex-col items-center p-8 bg-white rounded-md  '>
                    <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div>
                        <div className='flex items-center gap-2'>
                            <InputField
                                value={payload.lastName}
                                setValue={setPayload}
                                nameKey='lastName'
                            />
                            <InputField
                                value={payload.firstName}
                                setValue={setPayload}
                                nameKey='firstName'
                            />
                        </div>
                        <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                        />
                    </div>
                    }
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                    />
                    <Button
                        fw
                        name={isRegister ? 'Register' : 'Login'}
                        handleOnClick={handleSubmit}
                    />
                    <div className='flex items-center justify-between mt-2 w-full text-sm'>
                        {!isRegister && <span
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setIsForgotPwD(true)}
                        >
                            Forgot your account ?
                        </span>}
                        {!isRegister && <span
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setRegister(true)}
                        >
                            Create account ?
                        </span>}
                        {isRegister && <span
                            className='w-full text  -center text-blue-500 hover:underline cursor-pointer '
                            onClick={() => setRegister(false)}
                        >
                            Go login
                        </span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
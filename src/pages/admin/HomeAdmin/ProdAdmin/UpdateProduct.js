import clsx from 'clsx'
import { Button, InputForm, MarkDownEditor, Select } from 'components'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import { getBase64, validate } from 'utils/helper';
import icons from 'utils/icons';
import { toast } from 'react-toastify';

const { IoTrashBinOutline } = icons

const UpdateProduct = ({ updateProd, render, setUpdateProd }) => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [hoverElm, setHoverElm] = useState(null)
    const [invalidFields, setInvalidFields] = useState([])

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    const handleBase64 = async (file) => {
        const toBase64 = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
    const handleRemoveImg = (name) => {
        const files = [...watch('images')]
        const imagePath = files?.filter(el => el.name !== name)
        reset({ images: imagePath })
        if (preview?.images.some(el => el.name === name)) setPreview(prev => ({ ...prev, images: prev?.images?.filter(el => el.name !== name) }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Files not supported')
            }
            const base64 = await getBase64(file)
            imagesPreview.push({
                name: file.name, path: base64
            })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }

    useEffect(() => {
        reset({
            title: updateProd?.title || '',
            price: updateProd?.price || '',
            quantity: updateProd?.quantity || '',
            color: updateProd?.color || '',
            category: updateProd?.category || '',
            brand: updateProd?.brand?.toLowerCase() || '',
        })
        setPayload({ description: typeof updateProd?.description === 'object' ? updateProd?.description?.join(', ') : updateProd?.description })
        setPreview({
            thumb: updateProd?.thumb || '',
            images: updateProd?.images || []
        })
    }, [])

    useEffect(() => {
        if (watch('thumb'))
            handleBase64(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images'))
            handlePreviewImages(watch('images'))
    }, [watch('images')])

    const handleCreateProd = async (data) => {

    }
    return (
        <div className={clsx('w-full flex flex-col gap-4 p-4 relative')}>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[327px]'>
                <h2 className='text-3xl font-bold tracking-tight'>Update products</h2>
                <Button
                    handleOnClick={() => setUpdateProd(null)}
                >
                    Cancel
                </Button>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProd)}>
                    <InputForm
                        label='Name Product'
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: 'Need fill this field'
                        }}
                        fullWidth
                        placeholder='Name of new product'
                    />
                    <div className='w-full flex gap-4 my-6'>
                        <InputForm
                            label='Price'
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-1`}
                            placeholder='Price of new product'
                        />
                        <InputForm
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-1`}
                            placeholder='Quantity of new product'
                        />
                        <InputForm
                            label='Color'
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-1`}
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='w-full flex gap-4 my-6'>
                        <Select
                            fullWidth={true}
                            register={register}
                            label='Category'
                            options={categories?.map(el => ({ code: el?.title, value: el?.title }))}
                            id='category'
                            errors={errors}
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style={`flex-auto`}
                        />
                        <Select
                            fullWidth={true}
                            errors={errors}
                            register={register}
                            label='Brand'
                            options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({
                                code: el.toLowerCase(), value: el
                            }))}
                            id='brand'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style={`flex-auto`}
                        />
                    </div>
                    <MarkDownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload?.description}
                    />
                    <div className='flex flex-col'>
                        <div
                            onClick={e => e.stopPropagation()}
                            className='flex flex-col gap-2 mt-8'>
                            <label className='font-semibold' htmlFor="thumb">Upload Thumb</label>
                            <input
                                className='cursor-pointer max-w-[400px]'
                                id='thumb'
                                {...register('thumb', { required: 'Need fill this field' })}
                                type="file"
                            />
                            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                        </div>
                        {preview.thumb && <div className='my-4'>
                            <img src={preview.thumb} alt="thumb" className='w-[200px] object-contain' />
                        </div>}
                        <div className=' flex flex-col gap-2 my-4'>
                            <label className='font-semibold' htmlFor="images">Upload Images</label>
                            <input
                                className='cursor-pointer max-w-[400px]'
                                id='images'
                                multiple
                                {...register('images', { required: 'Need fill this field' })}
                                type="file"
                            />
                            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                        </div>
                        {preview.images.length > 0 && <div className='flex flex-wrap w-full gap-3 my-4 '>
                            {preview.images?.map((el, idx) => (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHoverElm(el.name)}
                                    onMouseLeave={() => setHoverElm(null)}
                                    className='w-fit relative'
                                >
                                    <img src={el} alt="products" className='w-[200px] object-contain' />
                                    {hoverElm === el.name &&
                                        <div
                                            className='absolute flex items-center justify-center animate-scale-up-center inset-0 bg-overlay cursor-pointer'
                                            onClick={() => handleRemoveImg(el.name)}
                                        >
                                            <IoTrashBinOutline size={24} color='white' />
                                        </div>}
                                </div>
                            ))}
                        </div>}
                    </div>
                    <Button type='submit'>Update New Product</Button>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)
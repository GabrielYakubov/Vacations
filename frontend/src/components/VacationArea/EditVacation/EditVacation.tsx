import React, { FC, useEffect } from 'react';
import { useForm } from "react-hook-form";
import validation from './validation';
import styles from './EditVacation.module.scss';
import { BASE_API_URL } from '../../../config';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import Modal from '../../Modal/Modal';
import { updateVacation as updateVacationAsync } from '../../../utils/fetch';
import { updateVacation } from '../vacationSlice';
import { useAppDispatch } from '../../../hooks';
import Vacation from '../../../models/Vacation';
import { useState } from 'react';


interface EditVacationProps {
    onClose: () => void;
    vacation: Vacation;
}


const EditVacation: FC<EditVacationProps> = ({onClose, vacation}) => {
    const { register, handleSubmit, formState, setValue } = useForm<Vacation>();
    const dispatch = useAppDispatch();
    const imgSrc = `${BASE_API_URL}/vacation/image/${vacation.imageName}`;
    const [previewImage, setPreviewImage] = useState<string | null>(imgSrc)



    const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0];
        if(image){
            const imageUrl = URL.createObjectURL(image)
            setPreviewImage(imageUrl)
        }
    }


    const submitVacationHandler = (vacation: Vacation) => {
        onClose()
         updateVacationAsync(vacation).then((response) => {
            dispatch(updateVacation(response));
        }).catch(err => {
            console.log(err)
        })

    }


    const formatDateTime = (dateTime: string): string => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours())
        hours = ('0' + hours).slice(-2);
        let minutes = String(date.getMinutes())
        minutes = ('0' + minutes).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
    


    useEffect(() => {
        if(vacation){
                setValue("vacationId", +vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", formatDateTime(vacation.startDate));
                setValue("endDate", formatDateTime(vacation.endDate));
                setValue("imageName", vacation.imageName)
                setValue("price", vacation.price);
                setValue("image", vacation.image)
        
        }
  
    }, []);


    return (

        <Modal onClose={onClose}>

            <div className={styles.EditVacation}>
                <div className={styles.EditVacation__header}>
                    <h2>Edit Vacation </h2>
                    <span onClick={onClose}>&#10006;</span>
                </div>
                <form onSubmit={handleSubmit(submitVacationHandler)} >

                    <input type="hidden"   {...register('vacationId')} />
                    {/* <input type="hidden" accept='image/*' {...register('image')} /> */}

                    <FormGroupWithError error={formState.errors.destination?.message}      >
                        <label>Destination:</label>
                        <input className='form-control' type="text" {...register('destination', validation.destination)} />
                    </FormGroupWithError>


                    <FormGroupWithError error={formState.errors.startDate?.message}>
                        <label>Start Date:</label>
                        <input className='form-control' type="datetime-local" {...register('startDate', validation.startDate)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.endDate?.message}>
                        <label>End Date:</label>
                        <input className='form-control' type="datetime-local" {...register('endDate', validation.endDate)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.price?.message}>
                        <label>Price:</label>
                        <input className='form-control' type="number" {...register('price', validation.price)} />
                    </FormGroupWithError>


                    <FormGroupWithError>
                        <div className={styles.image}>
                            <label>Image:</label>
                            { previewImage && <img src={previewImage} alt="" />}
                            <input className='form-control' type="file"  accept='image/*' {...register('image')} onChange={handlePreview}/>
                        </div>
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.description?.message}>
                        <label>Description:</label>
                        <textarea className='form-control'   {...register('description', validation.description)} />
                    </FormGroupWithError>

                    <button className='btn btn-primary'>Edit Vacation</button>

                </form>
            </div>

        </Modal>
    )
}




export default EditVacation;






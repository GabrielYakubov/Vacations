import React, { FC, useEffect, useState  } from 'react';
import { useForm } from "react-hook-form";
import Vacation from '../../../models/Vacation';
import validation from './validation';
import styles from './AddVacation.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import Modal from '../../Modal/Modal';
import { addVacation as addVacationAsync, getVacations } from '../../../utils/fetch';
import { useAppDispatch } from '../../../hooks';
import { addVacation, setVacations } from '../vacationSlice';
import { useParams } from 'react-router-dom';
import Alert from '../../Alert/Alert';
import { useNavigate } from 'react-router-dom';


interface AddVacationProps {
    onClose: () => void;
    page:number;
}


const AddVacation: FC<AddVacationProps> = ({onClose,page}) => {
    const dispatch = useAppDispatch();
    const [vacationImage, setVacationImage] = useState({imageName:''})
    const { register, handleSubmit, formState, setValue } = useForm<Vacation>();
    const [error, setError] = useState<any>(null);
    const [showError, setShowError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const { vacationId } = useParams()





    const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0];
        if(image){
            const imageUrl = URL.createObjectURL(image)
            setPreviewImage(imageUrl)
        }
    }
    
    
    
    const submitVacationHandler = async (vacation: Vacation) => {
        const today = new Date()
        today.setHours(0,0,0,0)
        const vacationStartDate = new Date(vacation.startDate);
        const vacationEndDate = new Date(vacation.endDate);
        if (vacationStartDate <= today || vacationEndDate <= today || vacationEndDate < vacationStartDate) {
            setStartDateError(true);
            return;
        } else {
            setStartDateError(false)
        }

        
        try {
            const addedVacation = await addVacationAsync(vacation)
            setVacationImage((prevImage) => ({
                ...prevImage,
                imageName: addedVacation.imageName
            }))
            dispatch(addVacation(addedVacation))
            const vacations = await getVacations(page)
            dispatch(setVacations(vacations))


    
           }
            catch(err:any){
                setShowError(true);
                setError(err.response.data);
            };

            onClose()
    }




    const formatDateTime = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours())
        hours = ('0' + hours).slice(-2);
        let minutes = String(date.getMinutes())
        minutes = ('0' + minutes).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      const errorToggleHandler = () => {
        setShowError(prevState => !prevState)
      }
    

    useEffect(() => {
                setValue("startDate", formatDateTime());
                setValue("endDate", formatDateTime());
            }, []);



    return (

        <Modal onClose={onClose}>
            <div className={styles.AddVacation}>
                <div className={styles.AddVacation__header}>
                    <h2>Add Vacation </h2>
                    <span onClick={onClose}>&#10006;</span>
                </div>

                <form onSubmit={handleSubmit(submitVacationHandler)} >
                    <input hidden type="text" value={vacationId} {...register("vacationId")}/>

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
                        {startDateError && <span className={styles.AddVacation__error}>Date cannot be past date</span>}
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.price?.message}>
                        <label>Price:</label>
                        <input className='form-control' type="number" {...register('price', validation.price)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.image?.message}>
                    <div className={styles.image}>
                            <label>Image:</label>
                            { previewImage && <img src={previewImage} alt="" />}
                            <input className='form-control' type="file"  accept='image/*' {...register('image')} onChange={handlePreview}/>
                        </div>
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.description?.message}>
                        <label>Description:</label>
                        <textarea className='form-control' {...register('description', validation.description)} />
                    </FormGroupWithError>


                    <button className='btn btn-primary'>Add Vacation</button>

                </form>
                {showError && <Alert onClose={errorToggleHandler}>{error}</Alert>}
            </div>
        </Modal>
 



       
    )
}



export default AddVacation;




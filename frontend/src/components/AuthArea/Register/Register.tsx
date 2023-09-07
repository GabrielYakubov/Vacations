import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerAsync } from '../../../fetch/auth';
import validation from './validation';
import * as Auth from '../../../auth/authSlice';
import User from '../../../models/User';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import styles from './Register.module.scss';
import { useAppDispatch } from '../../../hooks';
import Modal from '../../Modal/Modal';
import { Box, LinearProgress } from '@mui/material';
import { logout } from '../../../auth/authSlice';

interface RegisterProps {
 }

const Register: FC<RegisterProps> = () => {
    const { register, handleSubmit, formState } = useForm<User>();
    const [match, setMatch] = useState<boolean>(false)
    const [error,setError] = useState<string>('')
    const [registered,setRegistered] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    const registerHandler = async (user: User) => {
        setError('')
        const confirm = document.getElementById('confirm') as HTMLInputElement | null
        const value = confirm?.value

        if (!isValidEmail(user.email)) {
            setError('Please enter a valid email address');
            return;
        } else {
            setError('')
        }

        if(user.password !== value) {
            setMatch(true)
            return
        } else {
            setMatch(false)
        }
        try {
            const token = await registerAsync(user);
            dispatch(Auth.register(token))
            
        } catch (err:any) {
            console.log(err)
            if(err.response.status === 400){
                setError(err.response.data)
            return
            }
        }
        modalToggle()
        dispatch(logout())
        
        setTimeout(() => {
            modalToggle()
            navigate('/login')
        },5000)
        
    }


    const modalToggle = () => {
        setRegistered(prevState => !prevState)
    }


    const redirect = () => {
        return (
            <Modal onClose={modalToggle}>
                <Box sx={{width: '50%'}}>
                <div className={styles.Register__ThankYouMsg}>
                <h2>Thank you for becoming a member!</h2>
                <p>You will now be redirected to the login page.</p>
                </div>
                <LinearProgress sx={{height:'7px'}} />
                </Box>
            </Modal>
        )
    }

    const isValidEmail = (email:string) => {
        return /\S+@\S+\.\S+/.test(email);
      }



    return (
        <div className={styles.Register}>
            <div className={styles.Register__card}>

            <h2>Register</h2>
            <div className={styles.Register__inputs}>
                <form onSubmit={handleSubmit(registerHandler)}>

                    <FormGroupWithError error={formState.errors.firstName?.message}>
                        <label>First name</label>
                        <input type="text" autoFocus {...register('firstName', validation.firstName)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.lastName?.message}>
                        <label>Last name</label>
                        <input type="text" {...register('lastName',validation.lastName)} />
                    </FormGroupWithError>


                    <FormGroupWithError error={formState.errors.email?.message}>
                        <label>Email</label>
                        <input type="email" {...register('email',validation.email)} />
                        {error && <span>{error}</span>}
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.password?.message}>
                        <label>Password</label>
                        <input type="password"  {...register('password',validation.password)} />
                    </FormGroupWithError>


                    <FormGroupWithError>
                        <label>Confirm Password</label>
                        <input type="password" id='confirm'/>
                        {match && <span>Passwords does not match</span>}
                    </FormGroupWithError>
        
                    <button className='btn btn-primary'>Register</button>
                </form>

                {registered && redirect()}
            </div>

            <p>Already a member ? <NavLink to='/login'>Login</NavLink></p>
            </div>
        </div>
    )
}


export default Register;

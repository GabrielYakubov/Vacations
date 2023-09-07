import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../auth/authSlice';
import { loginAsync } from '../../../fetch/auth';
import { useAppDispatch } from '../../../hooks';
import Credentials from '../../../models/Credentials';
import validation from './validation';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import styles from './Login.module.scss';
import { NavLink } from 'react-router-dom';
import { Box,  } from '@mui/material';
import Modal from '../../Modal/Modal';
import { useAppSelector } from '../../../hooks';
interface LoginProps { }

const Login: FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const [errMessage,setErrMessage] = useState('')
    const [logged,setlogged] = useState<boolean>(false)
    const { register, handleSubmit, formState } = useForm<Credentials>();
    const { user } = useAppSelector((state) => state.authState);
    const navigate = useNavigate();



    const loginHandler = async (credentials: Credentials) => {
        try {
            const token = await loginAsync(credentials);
            setErrMessage('')
            dispatch(login(token));
            modalToggle()

            setTimeout(() => {
                navigate('/vacation')
            },3000)

        } catch (err:any) {
            setErrMessage(err.response.data.toLowerCase())
        }
    }

    const welcomeBack = () => {
        return ( 
            <Modal onClose={modalToggle}>
                <Box sx={{width: '30%', height: '20%'}}>
                    <div className={styles.Login__welcome}>
                        <h2>Welcome Back!</h2>
                    </div>
                </Box>
            </Modal>
        )
    }

    const modalToggle = () => {
        setlogged(prevState => !prevState)
    }


    return (
        <div className={styles.Login}>
            <div className={styles.Login__card}>
              <h2>Login</h2>
                <div className={styles.Login__inputs}>
                    <form onSubmit={handleSubmit(loginHandler)} autoComplete='on'>
                        <FormGroupWithError error={formState.errors.email?.message}>
                            <label htmlFor='email'>Email</label>
                            <input type="text"  className='email' autoFocus {...register('email', validation.email)} />
                        </FormGroupWithError>

                        <FormGroupWithError error={formState.errors.password?.message}>
                            <label>Password</label>
                            <input type="password"  {...register('password', validation.password)} />
                            {errMessage.length !== 0 && <span>{errMessage}</span>}
                        </FormGroupWithError>
                        <button className='btn btn-primary'>Login</button>
                    </form>
                        {logged && welcomeBack()}
                </div>
                <p>Don't have an account ? <NavLink to='/register'>Register</NavLink></p>
            </div>
        </div>
    )
}


export default Login;
import React, { FC, ReactNode } from 'react';
import styles from './Alert.module.scss';
import Modal from '../Modal/Modal';


interface AlertProps {
    children?: ReactNode
    onClose: () => void;
}



const Alert: FC<AlertProps> = ({ onClose, children }) => {



    return (
        <Modal onClose={onClose}>
            <div className={styles.Alert}>
            <div className='children'>
                {children}
            </div>
                <button onClick={onClose} className='btn btn-success'>Close</button>
            </div>
        </Modal>
    )
}



export default Alert;

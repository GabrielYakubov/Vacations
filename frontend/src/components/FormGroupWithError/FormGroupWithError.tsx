import React, { FC, ReactNode } from 'react';
import styles from './FormGroupWithError.module.scss';

interface FormGroupWithErrorProps {
    children: ReactNode,
    error?: string;
}

const FormGroupWithError: FC<FormGroupWithErrorProps> = (props) => {

    const { error, children } = props;

    return (
        <div className={styles.FormGroupWithError}>
            {children}
            {error && <span className={styles.FormGroupWithError__error}>{error}</span>}
        </div>
    )
}



export default FormGroupWithError;

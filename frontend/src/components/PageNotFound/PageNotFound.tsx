import React, { FC } from 'react';
import styles from './PageNotFound.module.scss';

interface PageNotFoundProps { }

const PageNotFound: FC<PageNotFoundProps> = () => (
    <div className={styles.PageNotFound}>
        <div className={styles.PageNotFound__content}>
            <h2>The page you are looking for, does not exist.</h2>
            <img src="https://http.cat/images/404.jpg" alt="" />
        </div>
    </div>
);

export default PageNotFound;

import React, { FC } from 'react';
import Router from '../../Router/Router';
import styles from './Main.module.scss';

interface MainProps { }

//main content component that uses routes to display selected "page"

const Main: FC<MainProps> = () => {

    return (
        <main className={styles.Main}>
            <Router />
        </main>
    );
}

export default Main;


import React, { FC } from 'react';
import styles from './Footer.module.scss';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

interface FooterProps { }

const Footer: FC<FooterProps> = () => {


    return (
        <footer className={styles.Footer}>
            <p> All rights Reserved <CopyrightOutlinedIcon/></p>
        </footer>
    )
}

export default Footer;

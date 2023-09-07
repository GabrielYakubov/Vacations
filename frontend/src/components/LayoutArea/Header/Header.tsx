import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import luggage from '../../../assets/luggage.png'
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import styles from './Header.module.scss';
import { useAppSelector } from '../../../hooks';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
    const { user } = useAppSelector((state) => state.authState)

    return (
        <header className={styles.Header}>
            <div className="container-fluid">

            <nav className="navbar">
                <div className={styles.Header__logo}>
                    <img src={luggage} alt="" />
                    <h1><NavLink to="/vacation">Vacations</NavLink></h1>
                </div>

            {user && <NavLink className="nav-link" to="/vacation">Vacations <AirplaneTicketOutlinedIcon/></NavLink>}
            <NavLink className="nav-link" to="/about">About <InfoOutlinedIcon/></NavLink>
            <AuthMenu />
        </nav>
            </div>
        </header>
    )
}





export default Header;

import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../../auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import styles from "./AuthMenu.module.scss";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authState);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const renderContent = () => {
    if (user) {
      return (
        <>
          <span>
          <PersonOutlineOutlinedIcon/> Hello {user.firstName} {user.lastName}  {" "}
          </span>
          <NavLink onClick={logoutHandler} to="/login">
            Logout <LogoutOutlinedIcon/>
          </NavLink>
        </>
      );
    }

    return (
      <>
        <p>Hello Guest</p>
        <NavLink to="/login">
          Login <LoginOutlinedIcon/>
        </NavLink>
        <NavLink to="/register">
          Register <PersonAddAltOutlinedIcon/>
        </NavLink>
      </>
    );
  };

  return <div className={styles.AuthMenu}>{renderContent()}</div>;
};

export default AuthMenu;

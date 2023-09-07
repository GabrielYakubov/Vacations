import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getVacations } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import Loader from "../Loader/Loader";
import Vacations from "./Vacations/Vacations";
import { setVacations } from "./vacationSlice";
import styles from "./VacationsArea.module.scss";


interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {
  const { user } = useAppSelector((state) => state.authState);
  const { vacations } = useAppSelector((state) => state.vacationState);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    if(!user) navigate('/login')
    setIsLoading(true);
    getVacations(page)  
      .then((vacations) => {
        dispatch(setVacations(vacations));
        setIsLoading(false);
        // kicks user out back to login after set amount of hours (current is set to the token time in the back end)
        setInterval(() => {
          dispatch(logout())
          navigate('/login')
        },3 * 60 * 60 * 1000)
      })
      .catch((err) => {
        // checks for response type if unotherized logs out and redirects to login page
        if(err.response.status === 401){
          dispatch(logout())
          navigate('/login')
          
        } 
      })
      .finally(() => {

      });
  }, [page]);


  if (isLoading) {
    return (
      <div className={styles.VacationsArea__loaderContainer}>
        <Loader />
      </div>
    );
  }

  const nextPageHandeler = () => {
    if (vacations.length !== 10) {
      return;
    }
    setPage(page + 10);
  };

  const prevPageHandler = () => {
    if (page <= 0) {
      return;
    }
    setPage(page - 10);
  };

  return (
    <div className={styles.VacationsArea}>
    
      <Vacations vacations={vacations} page={page}/>
      <div className={styles.VacationsArea__pages}>
        {vacations.length === 10 && (
          <button className="btn btn-secondary" onClick={nextPageHandeler}>NEXT PAGE</button>
        )}
        {page !== 0 && <button className="btn btn-secondary" onClick={prevPageHandler}>Previous Page</button>}
      </div>
    </div>
  );
};

export default VacationsArea;

import React, { FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import Vacation from "../../../models/Vacation";
import VacationItem from "./VacationItem/VacationItem";
import styles from "./Vacations.module.scss";
import AddVacation from "../AddVacation/AddVacation";
import { getVacations } from "../../../utils/fetch";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


interface VacationsProps {
  vacations: Vacation[];
  page:number;
}


const Vacations: FC<VacationsProps> = ({ vacations, page }) => {
  const { user } = useAppSelector((state) => state.authState);
  const [showAddVacation, setShowAddVacation] = useState(false);
  const [vacation, setVacation] = useState(vacations);


  //sets vacations based on global vacation state
  useEffect(() => {
    setVacation(vacations)
  },[vacations])



  const upcomingVacations = async () => {

      const filteredVacations = vacations.filter((vacation) => {
        const today = new Date();
        const startingDate = new Date(vacation.startDate);
        return startingDate > today;
      });

      setVacation(filteredVacations)

    };


  const vacationsFollowedByUser = async () => {
      const vacations = await getVacations(page)
      const filteredVacations = vacations.filter((vacation) => {
        if(vacation.userIds){

          const ids = vacation.userIds.split(",").map(Number);
          for (let id of ids) {
            if (id === user?.userId) {
              return vacation
            }
          }
        }
      });
      setVacation(filteredVacations);
    }



  const activeVacations = async () => {
      const filteredVacations = vacations.filter((vacation) => {
        const today = new Date();
        const vacationStart = new Date(vacation.startDate);
        const vacationEnd = new Date(vacation.endDate);
        return today >= vacationStart && today <= vacationEnd;
      });
      setVacation(filteredVacations);
    }


    const clearFilters = () => {
      setVacation(vacations)
    }

  

  const addVacationModalHandler = () => {
    setShowAddVacation((prevState) => !prevState);
  };


  const renderVacations = (vacations: Vacation[]) => {
    return vacations.map((vacation) => {
      const { vacationId } = vacation;
      return <VacationItem key={vacationId} vacation={vacation} page={page}/>;
    });
  };

  

  
  return (
    <div className={styles.Vacations}>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span><strong>Filters:</strong></span>
          <div className="btn-group" role="group" >
            <button className="btn btn-outline-primary" onClick={upcomingVacations}>Upcoming Vacations <ScheduleIcon/></button>
            <button className="btn btn-outline-primary" onClick={activeVacations}>Active Vacations <EventAvailableIcon/></button>
            <button className="btn btn-outline-primary" onClick={vacationsFollowedByUser}>My Followed Vacations <FavoriteBorderOutlinedIcon/></button>
            <button className="btn btn-outline-secondary" onClick={clearFilters}>Clear Filters <HighlightOffOutlinedIcon/></button>
          </div>
          {user?.role === "admin" && (<div className={styles.Vacations__addbtn}>
            <NavLink className="btn btn-outline-primary me-2" to="/chart">Graph <BarChartOutlinedIcon/></NavLink>
            <button className="btn btn-outline-primary" onClick={addVacationModalHandler}>Add Vacation <AddOutlinedIcon/></button>
          </div>)}
        </div>
      </nav>
      <div className={styles.Vacations__filter}>
    </div>
      <div className={styles.Vacations__list}>{renderVacations(vacation)}</div>
      {showAddVacation && <AddVacation onClose={addVacationModalHandler} page={page} />}
    </div>
  );
};

export default Vacations;
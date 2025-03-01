import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../../../config";
import styles from "./VacationItem.module.scss";
import Vacation from "../../../../models/Vacation";
import { deleteVacation, setVacations } from "../../vacationSlice";
import { deleteVacation as deleteVacationAsync, getVacations } from "../../../../utils/fetch";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import EditVacation from "../../EditVacation/EditVacation";
import Modal from "../../../Modal/Modal";
import LikeButton from "../../../LikeButton/LikeButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface VacationItemProps {
  vacation: Vacation;
  page:number;
}

const VacationItem: FC<VacationItemProps> = ({ vacation,page }) => {
  const { vacationId, destination, description, startDate, endDate, price, imageName } = vacation;
  const { user } = useAppSelector((state) => state.authState);
  const [showEditVacation, setShowEditVacation] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const imgSrc = `${BASE_API_URL}/vacation/image/${imageName}`;

  const deleteVacationHandler = async () => {

    deleteVacationAsync(vacationId).then((deleted) => {
      dispatch(deleteVacation(vacationId));
      if (deleted) {
        // navigate("/vacation");
        
      }
    });
    const vacations = await getVacations(page)
    dispatch(setVacations(vacations))
  };

  


  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };


  const modalToggleHandler = () => {
    setShowEditVacation((prevState) => !prevState);
  };

  const deleteModalHandler = () => {
    setVerifyDelete((prevState) => !prevState);
  };

  const deleteModal = () => {
    return (
      <Modal onClose={deleteModalHandler}>
        <div className={styles.VacationItem__deleteModal}>
          <h2>You are about to delete a vacation!</h2>
          <p>Are you sure you want to continue?</p>
          <div className={styles.VacationItem__deleteBtn}>
            <button className="btn btn-success" onClick={deleteVacationHandler}>Continue</button>
            <button className="btn btn-primary" onClick={deleteModalHandler}>Cancel</button>
          </div>
        </div>
      </Modal>
    )
  }



  return (
    <div className={styles.VacationItem}>
        { user?.role === "admin" && <div className={styles.VacationItem__editBtns}>
          <span  className="btn btn-light" onClick={modalToggleHandler}>Edit <EditIcon/></span>
          <span className="btn btn-light" onClick={deleteModalHandler}>Delete <DeleteForeverIcon/></span>
          {verifyDelete && deleteModal()}
          {showEditVacation && (
            <EditVacation
              vacation={vacation}
              onClose={modalToggleHandler}
            />
          )}
        </div>}
      <div className={styles.VacationItem__image}>
        <img src={imgSrc} alt={imageName} />
        <h2>{destination}</h2>
          <LikeButton vacation={vacation}/>
      </div>
      <div className={styles.VacationItem__date}>
        <p>
          {formatDateTime(startDate)} - {formatDateTime(endDate)}
        </p>
      </div>
      <div className={styles.VacationItem__price}>
        <p>Price: {price} $</p>
      </div>
      <div className={styles.VacationItem__content}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VacationItem;

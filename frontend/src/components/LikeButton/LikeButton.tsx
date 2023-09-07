import React, { FC, useEffect, useState } from 'react';
import styles from './LikeButton.module.scss';
import { addLike, deleteLike } from '../../utils/fetch';
import { useAppSelector } from '../../hooks';
import Vacation from '../../models/Vacation';



interface LikeButtonProps {
  vacation:Vacation
}

const LikeButton: FC<LikeButtonProps> = ({vacation}) => {
  const { user } = useAppSelector((state) => state.authState)
  const { userCount, userIds, vacationId,  } = vacation
  const [ numberOfLikes, setNumberOfLikes ] = useState(userCount || 0)
  const [ isClick, setIsClick ] = useState(false);
  //svg shape put into variable for better readibility in the jsx return section
  const svgShape =
    "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z";


    useEffect(() => {
      if (userIds) {
        const ids = userIds.split(",").map(Number);
        for (let id of ids) {
          if (id === user?.userId) {
            setIsClick(true);
          }
        }
      }
    }, []);


    const addLikeHandler = () => {
      if(user){
        if (isClick === false) {
          addLike(vacationId, user.userId)
          setIsClick(true);
          setNumberOfLikes(numberOfLikes + 1)
        } else {
          if(numberOfLikes === 0 ) return;
          deleteLike(vacationId, user.userId)
          setNumberOfLikes(numberOfLikes - 1)
          setIsClick(false);
        }
      }
    };

  return (

    <div className={styles.LikeButton}>
   <span
          onClick={addLikeHandler}
          style={{ backgroundColor: isClick ? "#ffcddc" : "lightgrey"}}
        >
          <svg
            style={{ fill: isClick ? "#ea1d4a" : "grey" }}
            viewBox="0 0 32 29.6"
          >
            <path d={svgShape} />
          </svg>{" "}
          Likes: {numberOfLikes}
        </span>
  </div>
  )
}

export default LikeButton;

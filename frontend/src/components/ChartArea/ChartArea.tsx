import React, { FC } from 'react';
import styles from './ChartArea.module.scss';
import FollowersChart from './FollowersChart/FollowersChart';

interface ChartAreaProps {}

const ChartArea: FC<ChartAreaProps> = () => {

  return (
    <div className={styles.ChartArea}>
    <FollowersChart></FollowersChart>
  </div>
  )
}

export default ChartArea;

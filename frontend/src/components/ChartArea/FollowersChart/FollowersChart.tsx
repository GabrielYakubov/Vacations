import React, { FC, useEffect, useState } from "react";
import styles from "./FollowersChart.module.scss";
import { getFollowers } from "../../../utils/fetch";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Follower from "../../../models/Follower";
import { downloadCsv } from "../../../utils/fetch";
Chart.register(...registerables);

interface FollowersChartProps {}

const FollowersChart: FC<FollowersChartProps> = () => {
  const [follower, setFollower] = useState<Follower[]>();
  const labels = follower?.map((follower) => follower.destination)
  const dataPoints = follower?.map((follower) => follower.followers)
  

  useEffect(() => {
  getFollowers()
  .then((followers) => {
    setFollower(followers)
  })
  .catch((err: any) => {
    console.log(err);
  });
  },[])
  

  const downloadHandler = async () => {
    try {
       await downloadCsv()
    } catch(err){
      console.log(err)
    }
  }
  


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number Of Followers",
        data: dataPoints,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.FollowersChart}>
      <div className={styles.FollowersChart__button}>
        <button className="btn btn-outline-info" onClick={downloadHandler}>Download CSV</button>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};
export default FollowersChart;

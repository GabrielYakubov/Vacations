import React, { FC } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import styles from "./LayoutArea.module.scss";

interface LayoutAreaProps {}

const LayoutArea: FC<LayoutAreaProps> = () => (
  <div className={styles.LayoutArea}>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default LayoutArea;
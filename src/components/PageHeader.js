import React, { Fragment } from "react";
import styles from "./PageHeader.module.sass";

export default function PageHeader({ title, titleimage, subtitle }) {
  return (
    <Fragment>
      <nav className={styles.nav}>
        <a className={styles.home} href="/">
          Emelie & Sebastian
        </a>
      </nav>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <img
          className={styles.image}
          src={
            !!titleimage.childImageSharp
              ? titleimage.childImageSharp.fluid.src
              : titleimage
          }
        />
      </header>
    </Fragment>
  );
}

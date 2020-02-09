import React, { Fragment } from "react";
import styles from "./PageHeader.module.sass";

export default function PageHeader({ title, titleimage, subtitle }) {
  const headerStyle = {
    backgroundImage: `url(${
      !!titleimage.childImageSharp
        ? titleimage.childImageSharp.fluid.src
        : titleimage
    })`
  };

  return (
    <Fragment>
      <nav className={styles.nav}>
        <a className={styles.home} href="/">
          Emelie & Sebastian
        </a>
      </nav>
      <header className={styles.header}>
        <div className={styles.banner}>
          <h1 className={styles.title}>{title}</h1>
          <img
            className={styles.image}
            src={
              !!titleimage.childImageSharp
                ? titleimage.childImageSharp.fluid.src
                : titleimage
            }
          />
        </div>
      </header>
    </Fragment>
  );
}

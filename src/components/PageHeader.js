import React from "react";
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
    <header className={styles.header} style={headerStyle}>
      <nav className={styles.nav}>
        <a className={styles.home} href="/">
          Emelie & Sebastian
        </a>
        <a href="/#rsvp">RSVP</a>
      </nav>
      <div className={styles.titles}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>{subtitle}</h2>
      </div>
    </header>
  );
}

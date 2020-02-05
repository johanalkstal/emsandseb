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
      <h1 className={styles.title}>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}

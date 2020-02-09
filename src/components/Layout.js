import React from "react";
import { Helmet } from "react-helmet";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="sv" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC|Dancing+Script|Montserrat&display=swap"
          rel="stylesheet"
        />
        {/* <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        /> */}
      </Helmet>
      {children}
    </div>
  );
};

export default TemplateWrapper;

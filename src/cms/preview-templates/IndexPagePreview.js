import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <IndexPageTemplate
        couple={data.couple}
        others={data.others}
        form={data.form}
        title={data.title}
        titleimage={data.titleimage}
        subtitle={data.subtitle}
        intro={data.intro}
        form={data.form}
        ceremony={data.ceremony}
        location={data.location}
        stay={data.stay}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default IndexPagePreview;

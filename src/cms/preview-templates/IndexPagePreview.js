import React, { Fragment } from "react";
import PropTypes from "prop-types";
import PageHeader from "../../components/PageHeader";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <Fragment>
        <PageHeader title={data.title} titleimage={data.titleimage} />
        <IndexPageTemplate
          couple={data.couple}
          form={data.form}
          intro={data.intro}
          ceremony={data.ceremony}
          location={data.location}
          stay={data.stay}
          others={data.others}
        />
      </Fragment>
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

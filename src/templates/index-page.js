import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Countdown from "react-countdown";
import showdown from "showdown";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import EmailForm from "../components/EmailForm";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import styles from "./indexPage.module.sass";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const converter = new showdown.Converter();
const ceremonyLocation = [16.0009, 59.5961];
const mapboxToken =
  "pk.eyJ1IjoiYWxrc3RhbCIsImEiOiJjazZxN2ZpZXExam4yM2Zxc3J6eXZ4MTN3In0.B1FWxth0k2P8Dj0gBVVysw";

export class IndexPageTemplate extends React.Component {
  mapRef = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken = mapboxToken;

    this.map = new mapboxgl.Map({
      center: ceremonyLocation,
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13
    });

    const directions = new MapboxDirections({
      accessToken: mapboxToken,
      unit: "metric"
    });

    this.map.addControl(directions);

    directions.setDestination("Tängsta 1, 731 93 Köping, Sweden");

    new mapboxgl.Marker().setLngLat(ceremonyLocation).addTo(this.map);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  countdownRenderer({ days, hours, minutes, seconds, completed }) {
    if (completed) {
      return <h2>Grattis Emelie och Sebastian!</h2>;
    } else {
      return (
        <div className={styles.time}>
          <div className={styles.timeUnit}>
            <span>{days}</span>
            <span>dagar</span>
          </div>

          <div className={styles.timeUnit}>
            <span>{hours}</span>
            <span>timmar</span>
          </div>

          <div className={styles.timeUnit}>
            <span>{minutes}</span>
            <span>minuter</span>
          </div>

          <div className={styles.timeUnit}>
            <span>{seconds}</span>
            <span>sekunder</span>
          </div>
        </div>
      );
    }
  }

  render() {
    const {
      couple,
      intro,
      form,
      ceremony,
      location,
      stay,
      others,
      countdownTitle
    } = this.props;

    return (
      <main>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(intro.content)
          }}
        ></div>

        <div className={styles.content}>
          <EmailForm form={form} />
        </div>

        <h2>{couple.title}</h2>
        <div className={styles.images}>
          <img
            src={
              !!couple.image1.childImageSharp
                ? couple.image1.childImageSharp.fluid.src
                : couple.image1
            }
          />
          <img
            className={styles.image2}
            src={
              !!couple.image2.childImageSharp
                ? couple.image2.childImageSharp.fluid.src
                : couple.image2
            }
          />
          <img
            className={styles.image3}
            src={
              !!couple.image3.childImageSharp
                ? couple.image3.childImageSharp.fluid.src
                : couple.image3
            }
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(couple.content)
          }}
        ></div>

        <div className={styles.bottomImage}>
          <img
            src={
              !!couple.image4.childImageSharp
                ? couple.image4.childImageSharp.fluid.src
                : couple.image4
            }
          />
        </div>

        <h2>{others.bestManTitle}</h2>
        <div className={styles.peopleImages}>
          <img
            src={
              !!others.bestManImage.childImageSharp
                ? others.bestManImage.childImageSharp.fluid.src
                : others.bestManImage
            }
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(others.bestManContent)
          }}
        ></div>

        <h2>{others.bridesMaidTitle}</h2>
        <div className={styles.peopleImages}>
          <img
            src={
              !!others.bridesMaidImage.childImageSharp
                ? others.bridesMaidImage.childImageSharp.fluid.src
                : others.bridesMaidImage
            }
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(others.bridesMaidContent)
          }}
        ></div>

        <h2>{others.toastMasterTitle}</h2>
        <div className={styles.peopleImages}>
          <img
            src={
              !!others.toastMasterImage.childImageSharp
                ? others.toastMasterImage.childImageSharp.fluid.src
                : others.toastMasterImage
            }
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(others.toastMasterContent)
          }}
        ></div>

        <h2>{others.toastMadameTitle}</h2>
        <div className={styles.peopleImages}>
          <img
            src={
              !!others.toastMadameImage.childImageSharp
                ? others.toastMadameImage.childImageSharp.fluid.src
                : others.toastMadameImage
            }
          />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(others.toastMadameContent)
          }}
        ></div>

        <h2>{ceremony.title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(ceremony.content)
          }}
        ></div>

        <h2>{location.title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(location.content)
          }}
        ></div>

        <div className={styles.map} ref={this.mapRef}></div>

        <h2>{stay.title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(stay.content)
          }}
        ></div>

        <div className={styles.countdown}>
          <h2 className={styles.countdownTitle}>{countdownTitle}</h2>
          <Countdown
            date={new Date("September 5, 2020, 14:30")}
            renderer={this.countdownRenderer}
          />
        </div>
      </main>
    );
  }
}

IndexPageTemplate.propTypes = {
  couple: PropTypes.object,
  titleimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  ceremony: PropTypes.object,
  location: PropTypes.object,
  stay: PropTypes.object,
  others: PropTypes.object,
  countdownTitle: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PageHeader
        title={frontmatter.title}
        titleimage={frontmatter.titleimage}
      />
      <IndexPageTemplate
        couple={frontmatter.couple}
        form={frontmatter.form}
        intro={frontmatter.intro}
        ceremony={frontmatter.ceremony}
        location={frontmatter.location}
        stay={frontmatter.stay}
        others={frontmatter.others}
        countdownTitle={frontmatter.countdownTitle}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        couple {
          title
          content
          image1 {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image2 {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image3 {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image4 {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        form {
          title
        }
        title
        titleimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        others {
          bestManTitle
          bestManContent
          bestManImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          bridesMaidTitle
          bridesMaidContent
          bridesMaidImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          toastMasterTitle
          toastMasterContent
          toastMasterImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          toastMadameTitle
          toastMadameContent
          toastMadameImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        intro {
          content
        }
        ceremony {
          title
          content
        }
        location {
          title
          content
        }
        stay {
          title
          content
        }
        countdownTitle
      }
    }
  }
`;

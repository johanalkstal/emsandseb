import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import showdown from "showdown";
import EmailForm from "../components/EmailForm";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import styles from "./indexPage.module.sass";

const converter = new showdown.Converter();

export class IndexPageTemplate extends React.Component {
  render() {
    const { couple, intro, form, ceremony, location, stay } = this.props;

    return (
      <main className={styles.main}>
        <h3>{intro.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(intro.content)
          }}
        ></div>

        <EmailForm form={form} />

        <h3>{couple.title}</h3>
        <div className={styles.images}>
          <img
            src={
              !!couple.image1.childImageSharp
                ? couple.image1.childImageSharp.fluid.src
                : couple.image1
            }
          />
          <img
            src={
              !!couple.image2.childImageSharp
                ? couple.image2.childImageSharp.fluid.src
                : couple.image2
            }
          />
          <img
            src={
              !!couple.image3.childImageSharp
                ? couple.image3.childImageSharp.fluid.src
                : couple.image3
            }
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(couple.content)
          }}
        ></div>

        <h3>{ceremony.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(ceremony.content)
          }}
        ></div>

        <h3>{location.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(location.content)
          }}
        ></div>

        <h3>{stay.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(stay.content)
          }}
        ></div>
      </main>
    );
  }
}

IndexPageTemplate.propTypes = {
  couple: PropTypes.object,
  titleimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ceremony: PropTypes.object,
  location: PropTypes.object,
  stay: PropTypes.object
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PageHeader
        title={frontmatter.title}
        titleimage={frontmatter.titleimage}
        subtitle={frontmatter.subtitle}
      />
      <IndexPageTemplate
        couple={frontmatter.couple}
        form={frontmatter.form}
        intro={frontmatter.intro}
        ceremony={frontmatter.ceremony}
        location={frontmatter.location}
        stay={frontmatter.stay}
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
        subtitle
        intro {
          title
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
      }
    }
  }
`;

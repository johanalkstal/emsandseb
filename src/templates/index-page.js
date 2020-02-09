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
    const { intro, form, ceremony, location, stay } = this.props;

    return (
      <main className={styles.main}>
        <h3>{intro.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(intro.content)
          }}
        ></div>
        <EmailForm form={form} />
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

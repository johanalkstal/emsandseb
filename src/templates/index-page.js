import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import showdown from "showdown";
import EmailForm from "../components/EmailForm";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

const converter = new showdown.Converter();

export class IndexPageTemplate extends React.Component {
  render() {
    const {
      titleimage,
      title,
      subtitle,
      intro,
      form,
      ceremony,
      location,
      stay
    } = this.props;

    return (
      <div>
        <PageHeader title={title} titleimage={titleimage} subtitle={subtitle} />
        <h2>{intro.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(intro.content)
          }}
        ></div>
        <EmailForm form={form} />
        <h2>{ceremony.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(ceremony.content)
          }}
        ></div>
        <h2>{location.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(location.content)
          }}
        ></div>
        <h2>{stay.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(stay.content) }}
        ></div>
      </div>
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
      <IndexPageTemplate
        form={frontmatter.form}
        titleimage={frontmatter.titleimage}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
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

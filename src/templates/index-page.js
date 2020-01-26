import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import EmailForm from '../components/EmailForm'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export class IndexPageTemplate extends React.Component {
  render() {
    const {
      titleimage,
      title,
      subtitle,
      form,
      ceremony,
      location,
      stay,
    } = this.props

    return (
      <div>
        <PageHeader
          title={title}
          titleimage={titleimage}
          subtitle={subtitle}
        />
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                    <EmailForm form={form} />
                    <div className="content">
                      <div className="tile">
                        <h1 className="title">{ceremony.title}</h1>
                      </div>
                      <div className="tile">
                        {ceremony.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

IndexPageTemplate.propTypes = {
  titleimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mainpitch: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        form={frontmatter.form}
        titleimage={frontmatter.titleimage}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        ceremony={frontmatter.ceremony}
        location={frontmatter.location}
        stay={frontmatter.stay}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

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
`

import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import Layout from '../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    const {
      form,
      titleimage,
      title,
      subtitle,
      mainpitch,
    } = this.props

    return (
      <div>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${
              !!titleimage.childImageSharp ? titleimage.childImageSharp.fluid.src : titleimage
              })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`,
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '150px',
              lineHeight: '1',
              justifyContent: 'space-around',
              alignItems: 'left',
              flexDirection: 'column',
            }}
          >
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                boxShadow:
                  'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                backgroundColor: 'rgb(255, 68, 0)',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em',
              }}
            >
              {title}
            </h1>
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow:
                  'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                backgroundColor: 'rgb(255, 68, 0)',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em',
              }}
            >
              {subtitle}
            </h3>
          </div>
        </div>
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                    <p>{form.title}</p>
                    <form
                      name="contact"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={this.handleSubmit}
                    >
                      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                      <input type="hidden" name="form-name" value="contact" />
                      <div hidden>
                        <label>
                          Don’t fill this out:{' '}
                          <input name="bot-field" onChange={this.handleChange} />
                        </label>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'name'}>
                          Your name
                  </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'text'}
                            name={'name'}
                            onChange={this.handleChange}
                            id={'name'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'email'}>
                          Email
                  </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'email'}
                            name={'email'}
                            onChange={this.handleChange}
                            id={'email'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'message'}>
                          Message
                  </label>
                        <div className="control">
                          <textarea
                            className="textarea"
                            name={'message'}
                            onChange={this.handleChange}
                            id={'message'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <button className="button is-link" type="submit">
                          Send
                  </button>
                      </div>
                    </form>
                    <div className="content">
                      <div className="tile">
                        <h1 className="title">{mainpitch.title}</h1>
                      </div>
                      <div className="tile">
                        <h3 className="subtitle">{mainpitch.description}</h3>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column is-12 has-text-centered">
                        <Link className="btn" to="/products">
                          See all products
                    </Link>
                      </div>
                    </div>
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        Latest stories
                  </h3>
                      <div className="column is-12 has-text-centered">
                        <Link className="btn" to="/blog">
                          Read more
                    </Link>
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
        mainpitch={frontmatter.mainpitch}
        intro={frontmatter.intro}
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
        mainpitch {
          title
          description
        }
        intro {
          heading
          description
        }
      }
    }
  }
`

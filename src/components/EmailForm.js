import React from 'react'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class EmailForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
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
      .then(() => console.log('Submitted'))
      .catch(error => alert(error))
  }


  render() {
    const { form } = this.props;

    return (
      <div>
        <div hidden>
          <form
            name="rsvp"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input name="bot-field" />
            <input name="name" />
            <input name="attending" />
            <input name="message" />
            <input name="food" />
            <input name="allergies" />
          </form>
        </div>
        <p>{form.title}</p>
        <form
          name="rsvp"
          method="post"
          action="/rsvp/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="rsvp" />
          <div hidden>
            <label>
              Fyll inte i detta:{' '}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <div className="field">
            <label className="label" htmlFor={'name'}>
              Namn
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
            <label className="label" htmlFor={'yes'}>
              Ja, jag kommer!
            </label>
            <div className="control">
              <input
                className="input"
                type={'radio'}
                name={'attending'}
                value={true}
                onChange={this.handleChange}
                id={'yes'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'no'}>
              Nej, jag kan tyvärr inte närvara
            </label>
            <div className="control">
              <input
                className="input"
                type={'radio'}
                name={'attending'}
                value={false}
                onChange={this.handleChange}
                id={'no'}
                required={true}
              />
            </div>
          </div>
          {this.state.attending && this.state.attending === 'true' &&
            <React.Fragment>
              <div className="field">
                <label className="label" htmlFor={'vegetarian'}>
                  Vegetariskt
              </label>
                <div className="control">
                  <input
                    className="input"
                    type={'radio'}
                    name={'food'}
                    value={'vegetarian'}
                    onChange={this.handleChange}
                    id={'vegetarian'}
                    required={true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor={'non-vegetarian'}>
                  Icke-vegetariskt
              </label>
                <div className="control">
                  <input
                    className="input"
                    type={'radio'}
                    name={'food'}
                    value={'non-vegetarian'}
                    onChange={this.handleChange}
                    id={'non-vegetarian'}
                    required={true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor={'no-food'}>
                  Jag kommer gärna på vigseln men kan inte närvara på middagen
              </label>
                <div className="control">
                  <input
                    className="input"
                    type={'radio'}
                    name={'food'}
                    value={'no food'}
                    onChange={this.handleChange}
                    id={'no-food'}
                    required={true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor={'allergies'}>
                  Allergier
              </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name={'allergies'}
                    onChange={this.handleChange}
                    id={'allergies'}
                  />
                </div>
              </div>
            </React.Fragment>
          }
          {this.state.attending && this.state.attending === 'false' &&
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
                />
              </div>
            </div>
          }
          <div className="field">
            <button className="button is-link" type="submit">
              Skicka
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default EmailForm
import React, { Fragment } from "react";
import styles from "./EmailForm.module.sass";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class EmailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notAGuest: false,
      submitError: false,
      submitted: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    fetch("/.netlify/functions/guests", {
      method: "POST",
      body: { name: form.elements.name.value }
    })
      .then(response => response.json())
      .then(isGuest => {
        if (!isGuest) {
          this.setState({ notAGuest: true });
        }

        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": form.getAttribute("name"),
            ...this.state
          })
        }).then(() =>
          this.setState({
            notAGuest: false,
            submitError: false,
            submitted: true
          })
        );
      })
      .catch(error => {
        this.setState({ submitError: true });
        console.error(error);
      });
  };

  render() {
    const { form } = this.props;
    const { notAGuest, submitError, submitted } = this.state;

    return (
      <div className={styles.form}>
        {!submitted && (
          <Fragment>
            <div hidden>
              <form
                name="rsvp"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input name="bot-field" />
                <input name="name" />
                <input name="email" />
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
                  Fyll inte i detta:{" "}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>

              <label htmlFor={"name"}>Namn</label>
              <input
                type={"text"}
                name={"name"}
                onChange={this.handleChange}
                id={"name"}
                required={true}
              />

              <label htmlFor={"email"}>E-post</label>
              <input
                type={"email"}
                name={"email"}
                onChange={this.handleChange}
                id={"email"}
              />

              <div className={styles.radio}>
                <label htmlFor={"yes"}>Ja, jag kommer!</label>
                <input
                  type={"radio"}
                  name={"attending"}
                  value={true}
                  onChange={this.handleChange}
                  id={"yes"}
                  required={true}
                />
              </div>

              <div className={styles.radio}>
                <label htmlFor={"no"}>Nej, jag kan tyvärr inte närvara</label>
                <input
                  className="input"
                  type={"radio"}
                  name={"attending"}
                  value={false}
                  onChange={this.handleChange}
                  id={"no"}
                  required={true}
                />
              </div>

              {this.state.attending && this.state.attending === "true" && (
                <div className={styles.section}>
                  <div className={styles.radio}>
                    <label htmlFor={"vegetarian"}>
                      Jag önskar vegetariskt till middagen
                    </label>
                    <input
                      className="input"
                      type={"radio"}
                      name={"food"}
                      value={"vegetarian"}
                      onChange={this.handleChange}
                      id={"vegetarian"}
                      required={true}
                    />
                  </div>

                  <div className={styles.radio}>
                    <label htmlFor={"non-vegetarian"}>
                      Jag önskar icke-vegetariskt till middagen
                    </label>
                    <input
                      className="input"
                      type={"radio"}
                      name={"food"}
                      value={"non-vegetarian"}
                      onChange={this.handleChange}
                      id={"non-vegetarian"}
                      required={true}
                    />
                  </div>

                  <div className={styles.radio}>
                    <label htmlFor={"no-food"}>
                      Jag kommer gärna på vigseln men kan inte närvara på
                      middagen
                    </label>
                    <input
                      className="input"
                      type={"radio"}
                      name={"food"}
                      value={"no food"}
                      onChange={this.handleChange}
                      id={"no-food"}
                      required={true}
                    />
                  </div>

                  <div>
                    <label htmlFor={"allergies"}>
                      Jag har följande allergier
                    </label>
                    <textarea
                      className="textarea"
                      name={"allergies"}
                      onChange={this.handleChange}
                      id={"allergies"}
                    />
                  </div>
                </div>
              )}

              {this.state.attending && this.state.attending === "false" && (
                <div className={styles.section}>
                  <label htmlFor={"message"}>
                    Skicka en hälsning till brudparet
                  </label>
                  <div>
                    <textarea
                      className="textarea"
                      name={"message"}
                      onChange={this.handleChange}
                      id={"message"}
                    />
                  </div>
                </div>
              )}
              <div>
                <button className="button is-link" type="submit">
                  Skicka
                </button>
              </div>
            </form>
          </Fragment>
        )}

        {submitted && <p>Tack! Ditt meddelande har skickats</p>}

        {submitError && (
          <p className="error">
            Hoppsan! Något gick fel med ditt meddelande. Hör av dig till
            emelie.alkstal@gmail.com för vidare hjälp.
          </p>
        )}

        {notAGuest && (
          <p className="error">
            Hoppsan! Namnet du har angivit finns inte med i gästlistan. Hör av
            dig till emelie.alkstal@gmail.com för vidare hjälp.
          </p>
        )}
      </div>
    );
  }
}

export default EmailForm;

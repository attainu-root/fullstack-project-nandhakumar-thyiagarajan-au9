import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: false,
      alert_content: "",
      email: "",
      email_button: "",
      further: false,
      verification_code: "",
      more_further: false,
      password: "",
      repeat_password: "",
    };
  }

  checking = () => {
    if (this.state.email) {
      axios
        .post("http://localhost:8900/forgotpassword/emailcheck", {
          email: this.state.email,
        })
        .then((response) => {
          if (response.data.email === "PRESENT") {
            this.setState({
              ...this.state,
              further: true,
              alert: false,
              email: "",
            });
          } else if (response.data.email === "NOT PRESENT") {
            this.setState({
              ...this.state,
              alert: true,
              alert_content: "ENTER VALID EMAIL",
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      this.setState({
        ...this.state,
        alert: true,
        alert_content: "PLEASE FILL THE EMAIL",
      });
    }
  };

  verification = () => {
    axios
      .post("http://localhost:8900/forgotpassword/verification", {
        data: this.state.verification_code,
      })
      .then((response) => {
        if (response.data.data === "NOT VERIFIED") {
          this.setState({
            ...this.state,
            verification_code: "",
            alert: true,
            alert_content: "ENTER VALID VERIFICATION CODE",
          });
        }
        if (response.data.data === "VERIFIED") {
          this.setState({
            ...this.state,
            alert: false,
            further: false,
            more_further: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  newpassword = () => {
    if (this.state.password.length <= 8) {
      this.setState({
        ...this.state,
        alert: true,
        alert_content: "ENTER STRONG PASSWORD",
      });
    }

    if (this.state.password.length > 8) {
      if (this.state.password !== this.state.repeat_password) {
        this.setState({
          ...this.state,
          alert: true,
          alert_content: "PASSWORD DOESNT MATCH",
        });
      } else {
        console.log("working");
        axios
          .post("http://localhost:8900/forgotpassword/newpassword", {
            data: this.state.repeat_password,
          })
          .then((response) => {
            if (response.data.data === "OKAY") {
              this.props.history.push("/");
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };
  render() {
    return (
      <>
        <section className="auth_section">
          <section className="auth_form">
            {this.state.alert && (
              <>
                <Alert severity="warning">{this.state.alert_content}</Alert>
              </>
            )}
            {!this.state.further && !this.state.more_further && (
              <>
                <TextField
                  value={this.state.email}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      email: e.target.value,
                    })
                  }
                  id="standard-basic"
                  label="E-mail"
                />
                {!this.state.more_further && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.checking}
                    >
                      CHECK
                    </Button>
                  </>
                )}
              </>
            )}
            {this.state.further && (
              <>
                <TextField
                  type="text"
                  value={this.state.verification_code}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      verification_code: e.target.value,
                    })
                  }
                  label="Enter confirmateion code"
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.verification}
                >
                  VERIFY
                </Button>
              </>
            )}
            {this.state.more_further && (
              <>
                <TextField
                  type="password"
                  label="Enter password"
                  value={this.state.password}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      password: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  type="password"
                  label="Repeat password"
                  value={this.state.repeat_password}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      repeat_password: e.target.value,
                    })
                  }
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.newpassword}
                >
                  CHANGE PASSWORD
                </Button>
              </>
            )}
          </section>
        </section>
      </>
    );
  }
}

export default Forgotpassword;

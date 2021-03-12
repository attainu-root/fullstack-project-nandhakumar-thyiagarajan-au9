import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      Username: '',
      Email: '',
      Password: '',
      RepeatPassword: '',
      alert: false,
      alertMessage: '',
    };
  }

  controlChange = () => {
    this.setState((prevState) => ({
      ...this.state,
      signup: !prevState.signup,
      Username: '',
      Email: '',
      Password: '',
      RepeatPassword: '',
      alert: false,
      alertMessage: '',
    }));
  };

  onchange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onsignup = () => {
    if (this.state.Username.length <= 0) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'ENTER USERNAME',
      });
    } else if (this.state.Email.length <= 10) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'ENTER VALID EMAIL',
      });
    } else if (this.state.Password.length <= 5) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'ENTER STRONG PASSWORD',
      });
    } else if (this.state.Password !== this.state.RepeatPassword) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'BOTH PASSWORD MISMATCH',
      });
    } else {
      this.setState({
        ...this.state,
        alert: false,
        alertMessage: '',
      });

      fetch(' http://localhost:3004/signup', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name: this.state.Username,
          email: this.state.Email,
          password: this.state.Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.controlChange();
        })
        .catch((error) => {
          this.setState({
            ...this.state,
            alert: true,
            alertMessage: 'SERVER ERROR OR EMAIL ALREADY USED',
          });
        });
    }
  };

  onlogin = () => {
    if (this.state.Email.length <= 10) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'ENTER VALID EMAIL',
      });
    } else if (this.state.Password.length <= 5) {
      this.setState({
        ...this.state,
        alert: true,
        alertMessage: 'ENTER VALID PASSWORD',
      });
    } else {
      this.setState({
        ...this.state,
        alert: false,
        alertMessage: '',
      });

      // posting for login
      fetch('http://localhost:3004/Login', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.state.Email,
          password: this.state.Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => this.props.history.push('/homepage'))
        .catch((error) => {
          this.setState({
            ...this.state,
            alert: true,
            alertMessage: 'SERVER ERROR OR PUT CORRECT EMAIL AND PASSWORD',
          });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <section className="auth_section">
          <form className="auth_form">
            {this.state.alert && (
              <>
                <Alert severity="error">{this.state.alertMessage}</Alert>
              </>
            )}
            {this.state.signup && (
              <>
                <TextField
                  className="primary_inputs"
                  label="Username"
                  type="text"
                  name="Username"
                  value={this.state.Username}
                  onChange={(e) => this.onchange(e.target.name, e.target.value)}
                />
              </>
            )}
            <TextField
              className="primary_inputs"
              label="Email"
              type="text"
              name="Email"
              value={this.state.Email}
              onChange={(e) => this.onchange(e.target.name, e.target.value)}
            />
            <TextField
              className="primary_inputs"
              label="Password"
              type="password"
              name="Password"
              value={this.state.Password}
              onChange={(e) => this.onchange(e.target.name, e.target.value)}
            />
            {this.state.signup && (
              <>
                <TextField
                  className="primary_inputs"
                  label="Repeat Password"
                  type="password"
                  name="RepeatPassword"
                  value={this.state.RepeatPassword}
                  onChange={(e) => this.onchange(e.target.name, e.target.value)}
                />
              </>
            )}

            {this.state.signup ? (
              <>
                <Button
                  className="primary_inputs"
                  variant="contained"
                  color="primary"
                  onClick={this.onsignup}
                >
                  SIGN UP
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="primary_inputs"
                  variant="contained"
                  color="primary"
                  onClick={this.onlogin}
                >
                  LOGIN
                </Button>
              </>
            )}

            {this.state.signup ? (
              <>
                {/* redirection to login */}
                <Button onClick={this.controlChange}>LOGIN</Button>
              </>
            ) : (
              <>
                <div>
                  {/* redirection to signup */}
                  <Button onClick={this.controlChange}>SIGN UP</Button>
                  <Button>FORGOT PASSWORD</Button>
                </div>
              </>
            )}
          </form>
        </section>
      </React.Fragment>
    );
  }
}

export default Login;

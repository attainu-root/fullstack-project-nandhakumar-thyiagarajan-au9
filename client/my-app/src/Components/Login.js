import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    }));
  };

  onchange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="auth_section">
          <form className="auth_form">
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Login.css';

const propTypes = {
  setAuthenticationStatus: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  formIsInvalid() {
    const { username, password } = this.state;
    return username.length <= 0 && password.length <= 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { history, setAuthenticationStatus } = this.props;

    try {
      await Auth.signIn(username, password);
      setAuthenticationStatus(true);
      history.push('/');
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Login">
        <form onSubmit={event => this.handleSubmit(event)}>
          <Form.Group controlId="username" bsSize="large">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={email}
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={event => this.handleChange(event)}
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={this.formIsInvalid()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Form } from 'react-bootstrap';
import { Auth, API } from 'aws-amplify';
import './Registration.css';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  setAuthenticationStatus: PropTypes.func.isRequired,
};

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formIsValid() {
    const { username, password, confirmPassword } = this.state;
    return (
      username.length > 0
      && password.length > 0
      && password === confirmPassword
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async createUser(username) {
    return API.post('videocloud', '/users', {
      body: { username },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    const { history, setAuthenticationStatus } = this.props;

    try {
      const user = await this.createUser(username);
      console.log(user)

      await Auth.signUp({
        username,
        password,
        attributes: { 'custom:id': user.id.toString(10) },
      });

      await Auth.signIn(username, password);
      setAuthenticationStatus(true);
      history.push('/');
    } catch (e) {
      alert(e);
    }
  }

  renderForm() {
    const { username, confirmPassword, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username" bsSize="large">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" bsSize="large">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Button
          block
          bsSize="large"
          disabled={!this.formIsValid()}
          type="submit"
        >
          Register
        </Button>
      </form>
    );
  }

  render() {
    return (
      <div className="Registration">
        {this.renderForm()}
      </div>
    );
  }
}

Registration.propTypes = propTypes;

export default Registration;

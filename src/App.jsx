import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };

    this.setAuthenticationStatus = this.setAuthenticationStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setAuthenticationStatus(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  setAuthenticationStatus(isAuthenticated) {
    this.setState({ isAuthenticated });
  }

  async handleLogout() {
    await Auth.signOut();
    this.setAuthenticationStatus(false);
    this.props.history.push('/');
  }

  render() {
    const { isAuthenticated, isAuthenticating } = this.state;
    const childProps = {
      isAuthenticated,
      setAuthenticationStatus: this.setAuthenticationStatus,
      handleLogout: this.handleLogout,
    };

    return (
      !isAuthenticating && (
      <div className="app">
        <Navbar childProps={childProps} />
        <Routes childProps={childProps} />
      </div>
      )
    );
  }
}

export default withRouter(App);

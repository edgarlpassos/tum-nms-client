import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const propTypes = {
  childProps: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    setAuthenticationStatus: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }).isRequired,
};

class VCNavbar extends Component {
  constructor(props) {
    super(props);

    this.renderAuthenticationSection = this.renderAuthenticationSection.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { childProps } = this.props;
    childProps.handleLogout();
  }

  renderAuthenticationSection() {
    const { childProps } = this.props;

    if (childProps.isAuthenticated) {
      return (
        <>
          <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
          <Nav.Link as={Link} onClick={this.handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    }

    return (
      <>
        <Nav.Item>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav.Item>
      </>
    );
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">VideoCloud</Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav className="justify-content-end">
          {this.renderAuthenticationSection()}
        </Nav>
      </Navbar>
    );
  }
}

VCNavbar.propTypes = propTypes;

export default VCNavbar;

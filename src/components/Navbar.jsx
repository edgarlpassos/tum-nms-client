import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export default () => (
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand as={Link} to="/">VideoCloud</Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav className="justify-content-end" >
        <Nav.Item>
          <Nav.Link as={Link} to="/Register">Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
);

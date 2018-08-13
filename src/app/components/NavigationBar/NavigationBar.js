import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from 'react-router-dom';

import LogoImg from 'img/logo.png';
import './NavigationBar.scss';

class NavigationBar extends Component {
  render() {
    return (
      <Navbar fluid fixedTop className="page-header">
        <Navbar.Header>
          <div className="page-logo">
            <Link to="/">
              <img src={LogoImg} className="logo logo-default" alt="logo" />
            </Link>
          </div>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>Batch</NavItem>
            <NavItem>Charge</NavItem>
            <NavItem>Report</NavItem>
            <NavItem>Chart</NavItem>
            <NavItem>Quote</NavItem>
            <NavItem>Config</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <i className="fa fa-clock-o" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

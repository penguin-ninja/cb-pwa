import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import LogoImg from 'img/logo.png';
import './NavigationBar.css';

@inject('sidebarStore', 'diagnoseStore')
class NavigationBar extends Component {
  render() {
    const { sidebarStore, diagnoseStore } = this.props;

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
            <LinkContainer exact to="/">
              <NavItem>
                <i className="fa fa-dashboard" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/mixes">
              <NavItem>
                <i className="fa fa-cogs" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/schedules">
              <NavItem>
                <i className="fa fa-clock-o" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/materials">
              <NavItem>
                <i className="fa fa-cubes" />
              </NavItem>
            </LinkContainer>
            <NavItem>
              <i className="fa fa-medkit" onClick={diagnoseStore.onShow} />
            </NavItem>
            <NavItem>
              <i
                className="fa fa-cog"
                onClick={() => sidebarStore.onToggle('devices')}
              />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

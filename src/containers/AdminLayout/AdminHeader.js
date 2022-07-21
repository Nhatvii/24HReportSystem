import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import AdminHeaderDropdown from "./AdminHeaderDropdown";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: "https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260",
            width: 110,
            height: 35,
            alt: "24h Report Logo",
          }}
          minimized={{
            src: "https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260",
            width: 30,
            height: 30,
            alt: "24h Report Logo",
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AdminHeaderDropdown notif />
          <AdminHeaderDropdown tasks />
          <AdminHeaderDropdown mssgs />
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin"></i>
            </NavLink>
          </NavItem>
          <AdminHeaderDropdown accnt />
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;

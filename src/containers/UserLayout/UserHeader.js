import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import UserHeaderDropdown from "./UserHeaderDropDown";
import Search from "./components/SearchBar";

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};

class UserHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <React.Fragment className="bg-transparent">
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: "https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260",
            width: 120,
            height: 40,
            alt: "24h Report Logo",
          }}
          minimized={{
            src: "https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260",
            width: 30,
            height: 30,
            alt: "24h Report Logo",
          }}
        />
        {/* d-md-down-none làm biến mất nếu thu nhỏ */}
        <Nav className="mr-auto d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/home" activeTab>
              Trang chủ
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/sendReport">Gửi báo cáo</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/viewReport">Xem báo cáo</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/faq">FAQ</NavLink>
          </NavItem>
        </Nav>
        {/* Search bar */}
        <Search />
        <Nav className="d-md-down-none" navbar>
          {/* Location funtion */}
          <NavItem>
            <NavLink href="#">
              <i className="icon-location-pin"></i>
            </NavLink>
          </NavItem>

          {/* Notification */}
          <UserHeaderDropdown notif />
          {/* Message */}
          <UserHeaderDropdown mssgs />
          {/* Account */}
          <UserHeaderDropdown accnt />
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

UserHeader.propTypes = propTypes;
UserHeader.defaultProps = defaultProps;

export default UserHeader;

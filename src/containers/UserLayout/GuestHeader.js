import React, { Component } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import Search from "./components/SearchBar";

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};

class GuestHeader extends Component {
  render() {
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
        {/* d-md-down-none làm biến mất nếu thu nhỏ */}
        <Nav className="mr-auto d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/home">Trang chủ</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/sendReport">Gửi báo cáo</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/faq">FAQ</NavLink>
          </NavItem>
        </Nav>
        {/* Search bar */}
        <Search />
        <Nav className="pr-4 pl-2" navbar>
          {/* Login button */}
          <Button
            block
            style={{
              background: "linear-gradient(to right,#56CCF2,#2F80ED)",
              color: "white",
            }}
            onClick={() => (window.location.href = "/auth#/login")}
          >
            Đăng nhập ngay
          </Button>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

GuestHeader.propTypes = propTypes;
GuestHeader.defaultProps = defaultProps;

export default GuestHeader;

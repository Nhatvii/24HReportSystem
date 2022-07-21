import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Redirect } from "react-router-dom";
const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};
const user_info = JSON.parse(localStorage.getItem("user_info"));
async function logout() {
  try {
    window.location.href = "/";
    localStorage.removeItem("user_info");
    // await axiosClient.post("/logout", null, {
    //   headers: {
    //     token: user_info.refreshToken,
    //   },
    // });
    // this.props.history.push("/");
  } catch (e) {
    alert(e.message);
  }
}

class UserHeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  redirectPath = (path) => {
    window.location.href = "/user/" + path;
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  dropNotif() {
    const itemsCount = 1;
    return (
      <Dropdown
        nav
        className="d-md-down-none"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle nav>
          <i className="icon-bell"></i>
          <Badge pill color="danger">
            {itemsCount}
          </Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center">
            <strong>You have {itemsCount} notifications</strong>
          </DropdownItem>
          <DropdownItem>
            <i className="icon-user-follow text-success"></i> Chào mừng
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
            className="img-avatar"
            alt="anhwtuan@gmail.com"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center">
            <strong>Account</strong>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-bell-o"></i> Updates
            <Badge color="info">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-envelope-o"></i> Messages
            <Badge color="success">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-comments"></i> Comments
            <Badge color="warning">42</Badge>
          </DropdownItem>
          <DropdownItem header tag="div" className="text-center">
            <strong>Settings</strong>
          </DropdownItem>
          <DropdownItem onClick={() => this.redirectPath("profile")}>
            <i className="fa fa-user"></i> Hồ sơ
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-wrench"></i> Settings
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={logout}>
            <i className="fa fa-lock"></i> Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropMssgs() {
    const itemsCount = 2;
    return (
      <Dropdown
        nav
        className="d-md-down-none"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle nav>
          <i className="icon-envelope-letter"></i>
          <Badge pill color="info">
            {itemsCount}
          </Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div">
            <strong>You have {itemsCount} messages</strong>
          </DropdownItem>
          <DropdownItem href="#"></DropdownItem>
          <DropdownItem href="#"></DropdownItem>
          <DropdownItem href="#"></DropdownItem>
          <DropdownItem href="#" className="text-center">
            <strong>View all messages</strong>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    return notif
      ? this.dropNotif()
      : accnt
      ? this.dropAccnt()
      : mssgs
      ? this.dropMssgs()
      : null;
  }
}

UserHeaderDropdown.propTypes = propTypes;
UserHeaderDropdown.defaultProps = defaultProps;

export default UserHeaderDropdown;

import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="# ">Copyright</a> &copy; 2022 .
        </span>
        <span className="ml-auto">
          Powered by <a href="https://coreui.io/react">24h Report</a>
        </span>
      </React.Fragment>
    );
  }
}

AdminFooter.propTypes = propTypes;
AdminFooter.defaultProps = defaultProps;

export default AdminFooter;

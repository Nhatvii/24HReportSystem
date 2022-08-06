import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import MainMenu from "../../components/MainMenu";
import FooterArea from "../../components/FooterArea";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <div className={props.parentClass}>
      <Fragment>
        <MainMenu />
      </Fragment>
      {/* Phần giữa */}
      <Route {...rest} render={(props) => <Component {...props} />} />
      {/* Footer  */}
      <FooterArea className="primay_bg" />
    </div>
  );
};
export default PrivateRoute;

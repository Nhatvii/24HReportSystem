import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import TopBar from "../../components/TopBar";
import MainMenu from "../../components/MainMenu";
import FooterArea from "../../components/FooterArea";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <div className={props.parentClass}>
      <Fragment>
        {/*=== home one/default ===*/}
        {/* <TopBar className="white_bg" /> */}
        {/* <div className="border_black" /> */}
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

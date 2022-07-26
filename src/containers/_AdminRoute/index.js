import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import TopBar from "../../components/TopBar";
import MainMenu from "../../components/MainMenu";
import FooterArea from "../../components/FooterArea";
import TopBarTwo from "../../components/TopBarTwo";
import MainMenuTwo from "../../components/MainMenuTwo";
import FooterAreaTwo from "../../components/FooterAreaTwo";
import FooterAreaThree from "../../components/FooterAreaThree";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <div className={props.parentClass}>
      {/* User Header */}
      {/* Phần giữa */}
      <Route {...rest} render={(props) => <Component {...props} />} />
      {/* Footer  */}
    </div>
  );
};
export default PrivateRoute;

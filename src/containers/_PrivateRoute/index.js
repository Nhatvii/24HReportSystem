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
      {props.home_style === 2 ? (
        <Fragment>
          {/*=== home two ===*/}
          <TopBarTwo />
          <div className="border_black" />
          <MainMenuTwo />
        </Fragment>
      ) : props.home_style === 3 ? (
        <Fragment>{/*=== home three ===*/}</Fragment>
      ) : props.home_style === 4 ? (
        <Fragment>
          {/*=== home dark version ===*/}
          <TopBar dark={true} />
          <div className="border_white" />
          <MainMenu dark={true} className="dark-2" />
        </Fragment>
      ) : (
        <Fragment>
          {/*=== home one/default ===*/}
          <TopBar className="white_bg" />
          <div className="border_black" />
          <MainMenu />
        </Fragment>
      )}
      {/* Phần giữa */}
      <Route {...rest} render={(props) => <Component {...props} />} />
      {/* Footer  */}
      {props.home_style === 2 ? (
        <FooterAreaTwo />
      ) : props.home_style === 3 ? (
        <FooterAreaThree />
      ) : props.home_style === 4 ? (
        <FooterArea className="dark-2" />
      ) : (
        <FooterArea className="primay_bg" />
      )}
    </div>
  );
};
export default PrivateRoute;

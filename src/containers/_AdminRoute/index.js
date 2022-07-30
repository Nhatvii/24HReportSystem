import React, { Fragment } from "react";
import { Route } from "react-router-dom";
// //scss
// import "../../assets/scss/hope-ui.scss";
// import "../../assets/scss/dark.scss";
// import "../../assets/scss/rtl.scss";
// import "../../assets/scss/custom.scss";
// import "../../assets/scss/customizer.scss";
const AdminRoute = (props) => {
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
export default AdminRoute;

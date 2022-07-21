import React from "react";

import { HeaderContainer, HeaderTitle } from "./HeaderStyles";

const Header = (props) => (
  <HeaderContainer>
    <HeaderTitle>{props.title}</HeaderTitle>
  </HeaderContainer>
);

export default Header;

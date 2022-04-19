import React, { Component } from "react";
import "./index.scss";
import NavbarUserDesktop from "./NavbarUserDesktop";
import NavbarUserMobile from "./NavbarUserMobile";

class ComponentNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.isMobile = window.innerWidth <= 991;
  }
 
  render() {
    const { toolsEnabled, forumEnabled, addonEnabled } = this.state;
    return (
      <>
        <NavbarUserMobile user={user} />

        <NavbarUserDesktop user={user} />
      </>
    );
  }
}

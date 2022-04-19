import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginBtn from "../Button/Login";
import CoursesIcon from "../icons/Navbar/Courses";
import ForumIcon from "../icons/Navbar/Forum";
import LiveIcon from "../icons/Navbar/Live";
import ProductIcon from "../icons/Navbar/Product";
import UserIcon from "../icons/Navbar/User";
import { generateName } from "../utils";
import MenuDropDown from "./MenuDropDown";
import "./NavbarUserDesktop.scss";
import UserSubMenu from "./UserSubMenu";

class NavbarUserDesktop extends Component {
  setStyleDropdown(visibility = "", opacity = "") {
    if (!this.navbar.current) return;
    const intro3 = this.navbar.current.querySelector("#intro-web-4");
    intro3.parentElement.style.visibility = visibility;
    intro3.parentElement.style.opacity = opacity;
  }

  render() {
    const { user, innerRef, toolsEnabled, forumEnabled, addonEnabled } =
      this.props;
    return (
      <>
        <nav className="navbar bg-light-blue navbar-user" ref={innerRef}>
          <div className="container justify-content-between text-white p-0" data-testid="navbar-menu">
            <div className="d-flex h-100 align-items-center">
              <Link
                className="navbar-brand m-0"
                to="/"
                data-testid="navbar-logo"
              >
                <img
                  width="120"
                  height="36.88"
                  src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                  alt=""
                />
              </Link>
            </div>
            <div
              className="navbar-user-main d-flex align-items-center h-100"
              ref={this.navbar}
            >
              {user.data ? (
                <>
                  <Link to="/kelas-saya">
                    <div
                      className="navbar-user-menu"
                      id="intro-2-course"
                      data-testid="navbar-kelas-saya"
                    >
                      <div className="mr-2">
                        <CoursesIcon />
                      </div>
                      <p className="mb-0 text-small font-weight-600 text-white">
                        {" "}
                        Kelas Saya
                      </p>
                    </div>
                  </Link>
                  <Link to="/produk-saya">
                    <div className="navbar-user-menu" id="intro-3-product">
                      <div className="mr-2">
                        <ProductIcon />
                      </div>
                      <p className="mb-0 text-small font-weight-600 text-white">
                        {" "}
                        Produk Saya
                      </p>
                    </div>
                  </Link>
                </>
              ) : (
                ""
              )}
              <Link to="/live">
                <div className="navbar-user-menu" id="intro-4-live">
                  <div className="mr-2">
                    <LiveIcon />
                  </div>
                  <p className="mb-0 text-small font-weight-600 text-white">
                    {" "}
                    Live Streaming
                  </p>
                </div>
              </Link>
              {forumEnabled ? (
                <Link to="/forum">
                  <div className="navbar-user-menu" id="intro-5-forum">
                    <div className="mr-2">
                      <ForumIcon />
                    </div>
                    <p className="mb-0 text-small font-weight-600 text-white">
                      {" "}
                      Forum Diskusi
                    </p>
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div>
              {user.data ? (
                <MenuDropDown
                  main={
                    <h6 className="mb-0 text-center d-flex align-items-center h-100 px-3">
                      <UserIcon className="mr-2" />{" "}
                      <span className="text-small d-flex align-items-center">
                        Hi, {generateName(user.data.name)}
                      </span>
                    </h6>
                  }
                  menu={[
                    {
                      text: "Akun",
                      id: "intro-1-account",
                      onClick: () => {
                        this.props.history.push(
                          `/profile/${this.props.user.data.id}`
                        );
                      },
                    },
                    {
                      text: "Keluar",
                      onClick: () => {
                        this.props.showLogout();
                      },
                    },
                  ]}
                ></MenuDropDown>
              ) : (
                <LoginBtn />
              )}
            </div>
          </div>
        </nav>
        <UserSubMenu toolsEnabled={toolsEnabled} addonEnabled={addonEnabled} />
      </>
    );
  }
}

export default withRouter(NavbarUserDesktop);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginBtn from "../Button/Login";
import BarIcon from "../icons/Bar";
import ChevronIcon from "../icons/Chevron";
import CoursesIcon from "../icons/Navbar/Courses";
import ForumIcon from "../icons/Navbar/Forum";
import LiveIcon from "../icons/Navbar/Live";
import ProductIcon from "../icons/Navbar/Product";
import UserIcon from "../icons/Navbar/User";
import { generateName } from "../utils";
import MenuDropDown from "./MenuDropDown";
import "./NavbarUserMobile.scss";

class NavbarUserMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailSub: false,
      openedSubMenu: {},
      showMenu: false,
    };

    this.userSubMenu = [
      {
        title: "Kelas",
        id: "intro-6-course",
        subMenu: [
          {
            title: "Premium",
            link: "/daftar-kelas-premium",
          },
          {
            title: "Free",
            link: "/daftar-kelas-free",
          },
          {
            title: "Partner",
            link: "/daftar-kelas-partner",
          },
        ],
      },

      {
        title: "Tools",
        id: "intro-7-tools",
        name: "toolsEnabled",
        subMenu: [
          {
            title: "Semua Tools",
            link: "/tools-kami",
          },
          {
            title: "Shopeasytools",
            link: "/shopeasytools",
          },
          {
            title: "Robotok",
            link: "/robotok",
          },
        ],
      },
      {
        title: "Jasa",
        id: "intro-8-service",
        subMenu: [
          {
            title: "Semua Jasa",
            link: "/jasa-kami",
          },
          {
            title: "Marketplace (E-Commerce)",
            link: "/jasa-kami/marketplace",
          },
          {
            title: "Social Media",
            link: "/jasa-kami/social-media",
          },
          {
            title: "Training & Coaching",
            link: "/jasa-kami/training-coaching",
          },
          {
            title: "Jasa Management Marketplace",
            link: "/jasa-kami/management-marketplace",
          },
        ],
      },
      {
        title: "Add On",
        id: "intro-9-addon",
        subMenu: [
          {
            title: "Semua Addon",
            link: "/add-on-kami",
          },
          {
            title: "Shopee Premium Plus",
            link: "/shopee-premium-plus",
          },
        ],
      },
    ];
  }

  resetState() {
    this.setState({
      showDetailSub: false,
      openedSubMenu: {},
      showMenu: false,
    });
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.resetState();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { user, innerRef, toolsEnabled, forumEnabled, addonEnabled } =
      this.props;
    const { showDetailSub, openedSubMenu, showMenu } = this.state;
    return (
      <>
        <nav className="navbar bg-light-blue navbar-mobile">
          <div className="container justify-content-between text-white p-0">
            <div
              className="cursor-pointer toogle-navbar-mobile"
              onClick={() =>
                this.setState({
                  showMenu: true,
                })
              }
            >
              <BarIcon />
            </div>
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
                    id: "intro-web-4",
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
        </nav>

        <div
          ref={innerRef}
          className={`navbar-user-mobile ${showMenu ? "d-block" : "d-none"}`}
        >
          <div className="navbar-mobile-backdrop"></div>
          <div
            className={`navbar-mobile-wrapper ${
              showDetailSub ? "navbar-mobile-sub-detail" : ""
            }`}
          >
            <div className="navbar-mobile-container">
              <div className="navbar-mobile-logo">
                <Link className="navbar-brand m-0" to="/">
                  <img
                    width="120"
                    height="36.88"
                    src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                    alt=""
                  />
                </Link>
              </div>
              {user.data ? (
                <div className="navbar-account">
                  <Link to={`/profile/${this.props.user.data.id}`}>
                    <p
                      className="mb-0 text-small font-weight-600 text-white"
                      id="intro-1-account"
                    >
                      {" "}
                      Akun
                    </p>
                  </Link>
                </div>
              ) : (
                ""
              )}

              <div className="navbar-mobile-main">
                {user.data ? (
                  <>
                    <Link to="/kelas-saya">
                      <div className="navbar-user-menu" id="intro-2-course">
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

              <div className="navbar-mobile-submenu">
                {this.userSubMenu.map((item) => {
                  if (item.name === "toolsEnabled" && !toolsEnabled) {
                    return <React.Fragment key={item.title} />;
                  }
                  if (item.name === "addonEnabled" && !addonEnabled) {
                    return <React.Fragment key={item.title} />;
                  }
                  return (
                    <div
                      className="submenu-list"
                      key={item.title}
                      onClick={() => {
                        if (item.link) {
                          this.props.history.push(item.link);
                          return;
                        }
                        this.setState({
                          showDetailSub: true,
                          openedSubMenu: item,
                        });
                      }}
                    >
                      <p className="mb-0" id={item.id}>
                        {item.title}
                      </p>
                      {item.subMenu ? (
                        <div className="submenu-icon">
                          <ChevronIcon width="13" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>

              {user.data ? (
                <div>
                  <p
                    className="mb-0 text-small font-weight-600 text-white cursor-pointer"
                    onClick={() => this.props.showLogout()}
                  >
                    {" "}
                    Keluar
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="navbar-mobile-submenu-detail">
              <div className="navbar-mobile-submenu-title">
                <div
                  className="submenu-icon"
                  onClick={() => {
                    this.setState({
                      showDetailSub: false,
                    });
                  }}
                >
                  <ChevronIcon width="15" />
                </div>
                <p className="mb-0">{openedSubMenu.title}</p>
              </div>
              <div className="navbar-mobile-submenu-list">
                {openedSubMenu.subMenu?.map((item, index) => {
                  return (
                    <Link to={item.link} key={index}>
                      <p className="submenu-item">{item.title}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="navbar-mobile-close"
            onClick={() => this.resetState()}
          ></div>
        </div>
      </>
    );
  }
}

export default withRouter(NavbarUserMobile);

import cn from "classnames";
import { memo, useState } from "react";
import { NAVIGATION_MENU } from "../../lib/constants";
import ChevronIcon from "../icons/chevron";
import style from "./user-mobile-menu.module.scss";
import UserMobileSubMenu from "./user-mobile-sub-menu";

function NavbarUserMobileMenu({ onClose }) {
  const [menu, setMenu] = useState({});
  return (
    <div className={style.mobile}>
      <div className={style.backdrop}></div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div style={{ marginLeft: menu.subMenu?.length ? "-275px" : "" }}>
            <div className={style.logo}>
              <a className="navbar-brand m-0" href="/">
                <img
                  width="120"
                  height="36.88"
                  src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                  alt=""
                />
              </a>
            </div>
            <div className={style.menu}>
              {NAVIGATION_MENU.map((item, index) => {
                return (
                  <div
                    className={cn(style.menuList, "cursor-pointer")}
                    onClick={() => setMenu(item)}
                    key={index}
                  >
                    <p className="mb-0">{item.title}</p>
                    <div className={style.menuIcon}>
                      <ChevronIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {menu.subMenu?.length ? (
            <div style={{ marginLeft: "50px" }}>
              <div className={style.subMenu}>
                <div
                  className={cn(style.subtitle, "cursor-pointer")}
                  onClick={() => setMenu({})}
                >
                  <div className="rotate-180">
                    <ChevronIcon />
                  </div>
                  <p className="mb-0">{menu.title}</p>
                </div>
                <div>
                  {menu.subMenu.map((item) => (
                    <UserMobileSubMenu item={item} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={style.close} onClick={onClose}></div>
    </div>
  );
}

export default memo(NavbarUserMobileMenu);

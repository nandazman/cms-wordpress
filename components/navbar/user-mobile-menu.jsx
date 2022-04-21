import { memo, useState } from "react";
import { NAVIGATION_MENU } from "../../lib/constants";
import ChevronIcon from "../icons/chevron";
import LinkToMea from "../linkToMea";
import style from "./user-mobile-menu.module.scss";

function NavbarUserMobileMenu({ onClose }) {
  const [menu, setMenu] = useState({});
  return (
    <div className={style.mobile}>
      <div className={style.backdrop}></div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div style={{ marginLeft: menu.subMenu?.length ? "-275px" : "" }}>
            <div class={style.logo}>
              <a class="navbar-brand m-0" href="/">
                <img
                  width="120"
                  height="36.88"
                  src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                  alt=""
                />
              </a>
            </div>
            <div class={style.menu}>
              {NAVIGATION_MENU.map((item, index) => {
                return (
                  <div class={style.menuList} key={index}>
                    <p class="mb-0" onClick={() => setMenu(item)}>
                      {item.title}
                    </p>
                    <div class={style.menuIcon}>
                      <ChevronIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {menu.subMenu?.length ? (
            <div style={{ marginLeft: "50px" }}>
              <div class={style.subMenu}>
                <div class={style.subtitle} onClick={() => setMenu({})}>
                  <div class="rotate-180">
                    <ChevronIcon />
                  </div>
                  <p class="mb-0">{menu.title}</p>
                </div>
                <div>
                  {menu.subMenu.map((item) => (
                    <LinkToMea
                      className={style.subMenuLink}
                      id={item.title}
                      to={item.link}
                    >
                      {item.title}
                    </LinkToMea>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div class={style.close} onClick={onClose}></div>
    </div>
  );
}

export default memo(NavbarUserMobileMenu);

import cn from "classnames";
import { NAVIGATION_MENU } from "../../lib/constants";
import LinkToMea from "../linkToMea";
import style from "./user-desktop.module.scss";

export default function NavbarUserDesktop() {
  return (
    <>
      <nav className={cn(style.nav, "flex justify-center items-center gap-x-8 px-2.5")}>
        {NAVIGATION_MENU.map((item, index) => {
          return (
            <div
              className={cn(
                style.navitem,
                "text-small cursor-pointer hover:text-orange hover:font-semibold"
              )}
              key={index}
            >
              <p id={item.id}>{item.title}</p>
              {item.subMenu ? (
                <div className={cn(style.submenu, "gap-x-10")}>
                  {item.subMenu.map((sub, subIndex) => {
                    return (
                      <div className="bg-white" key={subIndex}>
                        <LinkToMea
                          className="text-black font-normal hover:font-semibold"
                          id={sub.title}
                          to={sub.link}
                        >
                          {sub.title}
                        </LinkToMea>
                        {/* {sub.subMenu ? (
                            <DropdownSubMenu menu={sub.subMenu} />
                          ) : (
                            ""
                          )} */}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}

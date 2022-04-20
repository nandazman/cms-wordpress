import cn from "classnames";
import { NAVIGATION_MENU } from "../../lib/constants";
import style from "./user-desktop.module.scss";

export default function NavbarUserDesktop() {
  return (
    <>
      <nav className={cn(style.nav, "flex justify-center items-center gap-x-8 px-2.5")}>
        {NAVIGATION_MENU.map((item, index) => {
          return (
            <div
              className={cn(style.navitem, "text-small cursor-pointer")}
              key={index}
            >
              <p
                id={item.id}
                onClick={() => item.link && history.push(item.link)}
              >
                {item.title}
              </p>
              {item.subMenu ? (
                <div className={cn(style.submenu, "gap-x-10")}>
                  {item.subMenu.map((sub, subIndex) => {
                    return (
                      <div className="bg-white" key={subIndex}>
                        <p className="text-black">{sub.title}</p>
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

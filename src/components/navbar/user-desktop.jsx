import cn from "classnames";
import Image from "next/image";
import { NAVIGATION_MENU } from "../../lib/constants";
import Container from "../container";
import LinkToMea from "../linkToMea";
import style from "./user-desktop.module.scss";

export default function NavbarUserDesktop() {
  return (
    <>
      <nav className="relative">
        <Container
          className={cn(
            style.nav,
            "flex justify-center items-center gap-x-8 px-2.5 relative"
          )}
        >
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
                        <div
                          className={cn(
                            "bg-white relative py-[11px]",
                            style.submenuItem
                          )}
                          key={subIndex}
                        >
                          <LinkToMea
                            className={
                              "text-black font-normal hover:font-semibold"
                            }
                            id={sub.title}
                            to={sub.link}
                          >
                            {sub.title}
                          </LinkToMea>
                          <div
                            className={cn(
                              "absolute bg-disabled-form flex-col w-max top-10 hidden",
                              style.subSubmenu
                            )}
                          >
                            {sub.subMenu ? (
                              <>
                                {sub.subMenu.map((item) => (
                                  <LinkToMea
                                    key={item.link}
                                    label={item.title}
                                    to={item.link}
                                    className="p-2.5 text-black hover:bg-light-grey"
                                  >
                                    {item.title}
                                  </LinkToMea>
                                ))}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
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
          <div className="absolute left-5 top-3">
            <LinkToMea to="/">
              <Image
                width="120"
                height="36.88"
                src="https://storage.googleapis.com/smarketing-prod/others/logo-rebrand-ch-2_04_small.png"
                alt="MEA logo"
              />
            </LinkToMea>
          </div>
        </Container>
      </nav>
    </>
  );
}

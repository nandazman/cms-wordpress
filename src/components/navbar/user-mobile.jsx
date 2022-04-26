import cn from "classnames";
import { useCallback, useState } from "react";
import BarIcon from "../icons/bar";
import NavbarUserMobileMenu from "./user-mobile-menu";
import style from "./user-mobile.module.scss";

export default function NavbarUserMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const onClose = useCallback(() => setOpenMenu(false));
  return (
    <>
      <nav
        className={cn(
          style.nav,
          "flex justify-start items-center gap-x-8 px-5"
        )}
      >
        <span className="cursor-pointer" onClick={() => setOpenMenu((o) => !o)}>
          <BarIcon />
        </span>
        {openMenu ? <NavbarUserMobileMenu onClose={onClose} /> : <></>}
      </nav>
    </>
  );
}

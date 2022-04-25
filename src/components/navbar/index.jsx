import NavbarUserDesktop from "./user-desktop";
import NavbarUserMobile from "./user-mobile";

export default function Navigation() {
  return (
    <div className="bg-light-blue text-white mb-30px">
      <NavbarUserMobile />
      <NavbarUserDesktop />
    </div>
  );
}

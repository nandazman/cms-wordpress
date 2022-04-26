import { useState } from "react";
import LinkToMea from "../linkToMea";

export default function UserMobileSubMenu({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LinkToMea
        className="text-small font-semibold block mb-20px"
        id={item.title}
        to={item.link}
        onClick={() => {
          if (item.link) return;

          setOpen((o) => !o);
        }}
      >
        {item.title}
      </LinkToMea>
      {item.subMenu ? (
        <div className="flex flex-col ml-7 transition-all overflow-hidden" style={{ height: open ? "112px" : 0 }}>
          {item.subMenu.map((item) => (
            <LinkToMea to={item.link} className="mb-20px text-white">
              {item.title}
            </LinkToMea>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

import cn from "classnames";
import Link from "next/link";
import { Fragment } from "react";
import style from "./breadcrumb.module.scss";
  
export default function BreadCrumb({ menu, className }) {
  return (
    <div className={cn(style.breadcrumb, className)}>
      {menu.map((item, index) => (
        <Fragment key={index}>
          {item.link ? (
            <Link href={item.link}>
              <a className="cursor-pointer text-orange capitalize ">
                {item.text}
              </a>
            </Link>
          ) : (
            <p className="mb-0">{item.text}</p>
          )}

          <span style={{ margin: "0 5px" }}>
            {index !== menu.length - 1 ? ">" : ""}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
import cn from "classnames";
import Link from "next/link";
import { memo, useRef, useState } from "react";
import MagnifierIcon from "../icons/magnifier";

function SearchInput({ className }) {
  const link = useRef(null);
  const [value, setValue] = useState("");
  return (
    <div
      className={cn(
        "border-greyish-blue border rounded-lg flex justify-between",
        className
      )}
    >
      <input
        className="outline-0 w-full border-0 py-3.5 px-5 bg-transparent"
        placeholder="pencarian"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || !value) return;
          link.current.click();
        }}
      />
      <Link href={`/articles/search/${value}`}>
        <a aria-label="search" ref={link} className="p-3.5 cursor-pointer">
          <MagnifierIcon />
        </a>
      </Link>
    </div>
  );
}

export default memo(SearchInput)
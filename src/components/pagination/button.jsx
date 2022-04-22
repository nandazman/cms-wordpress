import cn from "classnames";
import { memo } from "react";
import ChevronIcon from "../icons/chevron";

function PaginationButton({ disabled, className, onClick }) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={cn(
        "bg-tosca-blue w-8 h-8 rounded flex justify-center items-center",
        className,
        {
          "opacity-70": disabled,
        }
      )}
    >
      <ChevronIcon variant="rounded" />
    </button>
  );
}

export default memo(PaginationButton);
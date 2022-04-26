import cn from "classnames";
import { memo } from "react";
import PaginationButton from "./button";

function PaginationButtons({
  className,
  pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor, page },
  onClick,
  limit = 6,
}) {
  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      <PaginationButton
        disabled={!hasPreviousPage}
        className="rotate-180"
        onClick={() => {
          onClick(
            {
              before: startCursor,
              last: limit,
            },
            -1
          );
        }}
      />
      <span className="bg-light-blue w-8 h-8 text-white text-semi-normal rounded flex justify-center items-center">
        {page}
      </span>
      <PaginationButton
        disabled={!hasNextPage}
        onClick={() => {
          onClick(
            {
              after: endCursor,
              first: limit,
            },
            1
          );
        }}
      />
    </div>
  );
}

export default memo(PaginationButtons);
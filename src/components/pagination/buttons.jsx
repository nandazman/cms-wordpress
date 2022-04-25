import cn from "classnames";
import { memo } from "react";
import PaginationButton from "./button";

function PaginationButtons({
  className,
  pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor },
  onClick,
  limit = 6
}) {
  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      <PaginationButton
        disabled={!hasPreviousPage}
        className="rotate-180"
        onClick={() => {
          onClick({
            before: startCursor,
            last: limit,
          });
        }}
      />
      <PaginationButton
        disabled={!hasNextPage}
        onClick={() => {
          onClick({
            after: endCursor,
            first: limit,
          });
        }}
      />
    </div>
  );
}

export default memo(PaginationButtons);
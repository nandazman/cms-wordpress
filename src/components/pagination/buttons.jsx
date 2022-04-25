import cn from "classnames";
import { memo } from "react";
import PaginationButton from "./button";

function PaginationButtons({
  className,
  pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor },
  onClick
}) {
  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      <PaginationButton
        disabled={!hasPreviousPage}
        className="rotate-180"
        onClick={() => {
          onClick({
            before: startCursor,
            last: 6,
          });
        }}
      />
      <PaginationButton
        disabled={!hasNextPage}
        onClick={() => {
          onClick({
            after: endCursor,
            first: 6,
          });
        }}
      />
    </div>
  );
}

export default memo(PaginationButtons);
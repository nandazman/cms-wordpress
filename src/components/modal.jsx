import cn from "classnames";
import { memo } from "react";

function Modal({ show, children, onHide }) {
  if (!show) return <></>;

  const fixedClass = "fixed top-0 left-0 w-full h-full";

  return (
    <>
      <div className={cn(fixedClass, "z-40 bg-black opacity-50")}></div>
      <div className={cn(fixedClass, "mx-auto z-50 modal")}>
        <div className="flex justify-center items-center w-full h-full">
          <div
            className="max-w-3xl w-full mx-auto p-4 relative"
            role="content"
          >
            <div className="bg-white p-2">
              {children}
            </div>
            <div
              className="cursor-pointer absolute top-0 right-0 flex items-center justify-center bg-white rounded-full w-24px h-246px"
              onClick={onHide}
            >
              x
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Modal);
import cn from "classnames";

export default function Loader() {
  const absoluteClass = "fixed top-0 left-0 w-full h-full z-20";
  return (
    <>
      <div className={cn(absoluteClass, "opacity-20 bg-black")}></div>
      <div className={cn(absoluteClass, "flex justify-center items-center")}>
        <div className="w-24 h-24 animate-spin-slow rounded-full border-[10px] border-light-blue border-b-orange"></div>
      </div>
    </>
  );
}
import cn from "classnames";

export default function Loader() {
  const absoluteClass = "absolute top-0 left-0 w-full h-full";
  return (
    <>
      <div className={cn(absoluteClass, "opacity-50 bg-black")}></div>
      <div className={cn(absoluteClass, "flex justify-center items-center")}>
        <div className="w-48 h-48 animate-spin rounded-full border-[15px] border-light-blue border-b-orange"></div>
      </div>
    </>
  );
}
import Image from "next/image";
import { memo } from "react";
import VideoPlayButton from "../video-play-button";

function CarouselVideoItem({ src, children, onClick }) {
  return (
    <>
      <div className="embla__slide">
        <div className="pl-2 w-full h-full relative">
          <Image src={src} layout="fill" />
          {children}
          <VideoPlayButton onClick={onClick} />
        </div>
      </div>
    </>
  );
}

export default memo(CarouselVideoItem);
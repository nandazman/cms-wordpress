import Image from "next/image";
import { memo } from "react";
import VideoPlayButton from "../video-play-button";

function CarouselVideoItem({ src, children, onClick }) {
  return (
    <>
      <div className="embla__slide">
        <Image src={src} layout="fill" />
        {children}
        <VideoPlayButton onClick={onClick} />
      </div>
    </>
  );
}

export default memo(CarouselVideoItem);
import Image from "next/image";
import VideoPlayButton from "../video-play-button";

export default function CarouselVideoItem({ src, children, onClick }) {
  return (
    <>
      <div className="embla__slide" onClick={onClick}>
        <Image src={src} layout="fill" />
        {children}
        <VideoPlayButton />
      </div>
    </>
  );
}
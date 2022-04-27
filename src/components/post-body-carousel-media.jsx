import { domToReact } from "html-react-parser";
import Image from "next/image";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import Carousel from "./carousel/carousel";
import CarouselVideoItem from "./carousel/video-item";
import Modal from "./modal";
import PostBodyVideo from "./post-body-video";

function PostBodyMediaCarousel({ domNode }) {
  const getBaseCarouselItem = () => {
    if (!window) return;
    const width = window.innerWidth;
    if (width <= 540) {
      return 1;
    }
    if (width >= 540 && width < 720) {
      return 2;
    }
    if (width > 720) {
      return 3;
    }
  }
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [imgSrc, setImageSrc] = useState("");
  const [carouselItem, setCarouselItem] = useState(3);

  useEffect(() => {
    setCarouselItem(getBaseCarouselItem());
  });

  const onHide = useCallback(() => {
    setShowModal(false);
  });

  const updateCarouselItem = () => {
    if (!window) return;

    const width = window.innerWidth;
    if (width <= 540) {
      setCarouselItem(1);
      return;
    }
    if (width >= 540 && width < 720) {
      setCarouselItem(2);
      return;
    }
    if (width > 720) {
      setCarouselItem(3);
      return;
    }
  };

  const onResize = useCallback(
    (embla, item) => {
      updateCarouselItem(item);
      embla.reInit();
    },
    [carouselItem]
  );
  

  const content = domNode.children.map((item, key) => {
    if (item.type === "tag") {
      const media = item.children.find((item) => item.name === "a");
      if (media && media.attribs["data-elementor-open-lightbox"] === "yes") {
        
        const image = media.attribs.href;
        const videoSrc = media.attribs["data-elementor-lightbox-video"];
        if (videoSrc) {
          const videoId = videoSrc.split("embed/")[1].split("?")[0];
          const onClick = useCallback(() => {
            setShowModal(true);
            setVideoId(videoId);
            setImageSrc(null);
          });

          return (
            <CarouselVideoItem
              key={key}
              onClick={onClick}
              videoSrc={videoSrc}
              src={image}
            />
          );
        }

        const src = media.attribs.href;
        const onClick = useCallback(() => {
          setShowModal(true);
          setImageSrc(src);
          setVideoId(null);
        });

        return (
          <div className="embla__slide" key={key}>
            <div className="pl-2 w-full h-full relative cursor-pointer" onClick={onClick}>
              <Image src={src} layout="fill" />
            </div>
          </div>
        );
      }
      return (
        <div className="embla__slide" key={key}>
          {domToReact(item.children)}
        </div>
      );
    }

    return <Fragment key={key}></Fragment>;
  });

  return (
    <>
      <Carousel onResize={onResize}>
        <div className={`embla__container embla__container-${carouselItem}`}>
          {content}
        </div>
      </Carousel>
      <Modal widthMaxContent={!!imgSrc} show={showModal} onHide={onHide}>
        <div>
          {imgSrc ? (
            <div className="relative">
              <Image src={imgSrc} width={240} height={200} layout="fixed" />
            </div>
          ) : (
            <></>
          )}
          {videoId ? <PostBodyVideo videoId={videoId} /> : <></>}
        </div>
      </Modal>
    </>
  );
}

export default memo(PostBodyMediaCarousel);
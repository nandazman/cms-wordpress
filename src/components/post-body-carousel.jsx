import { domToReact } from "html-react-parser";
import { useCallback, useEffect, useState } from "react";
import Carousel from "./carousel/carousel";
import CarouselVideoItem from "./carousel/video-item";
import Modal from "./modal";
import PostBodyVideo from "./post-body-video";

export default function PostBodyCarousel({ domNode }) {
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
  const [carouselItem, setCarouselItem] = useState(3);

  useEffect(() => {
    setCarouselItem(getBaseCarouselItem());
  });

  const onHide = useCallback(() => {
    setShowModal(false);
  });

  const updateCarouselItem = (carouselItem) => {
    if (!window) return;

    const width = window.innerWidth;
    if (width <= 540 && carouselItem !== 1) {
      setCarouselItem(1);
      return;
    }
    if (width >= 540 && width < 720 && carouselItem !== 2) {
      setCarouselItem(2);
      return;
    }
    if (width > 720 && carouselItem !== 3) {
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
  

  const content = domNode.children.map((item) => {
    if (item.type === "tag") {
      const video = item.children.find((item) => item.name === "a");
      if (video) {
        const image = video.attribs.href;
        const videoSrc = video.attribs["data-elementor-lightbox-video"];
        const videoId = videoSrc.split("embed/")[1].split("?")[0];

        const onClick = useCallback(() => {
          setShowModal(true);
          setVideoId(videoId);
        });
        return (
          <CarouselVideoItem
            onClick={onClick}
            videoSrc={videoSrc}
            src={image}
          />
        );
      }
      return (
        <div
          className="embla__slide"
        >
          {domToReact(item.children)}
        </div>
      );
    }

    return <></>;
  });

  return (
    <>
      <Carousel item={carouselItem} onResize={onResize}>
        <div className={`embla__container embla__container-${carouselItem}`}>
          {content}
        </div>
      </Carousel>
      <Modal show={showModal} onHide={onHide}>
        <div>
          <PostBodyVideo videoId={videoId} />
        </div>
      </Modal>
    </>
  );
}

// export default memo(PostBodyCarousel)
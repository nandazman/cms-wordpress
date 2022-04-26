import { domToReact } from "html-react-parser";
import { useCallback, useState } from "react";
import Carousel from "./carousel/carousel";
import CarouselVideoItem from "./carousel/video-item";
import Modal from "./modal";
import PostBodyVideo from "./post-body-video";

export default function PostBodyCarousel({ domNode }) {
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");

  const onHide = useCallback(() => {
    setShowModal(false);
  });

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
      return <div className="embla__slide">{domToReact(item.children)}</div>;
    }

    return <></>;
  });

  domNode.attribs.class = "embla__container";
  return (
    <>
      <Carousel>
        <div className="embla__container">{content}</div>
      </Carousel>
      <Modal show={showModal} onHide={onHide}>
        <div>
          <PostBodyVideo videoId={videoId} />
        </div>
      </Modal>
    </>
  );
}

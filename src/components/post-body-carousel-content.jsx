import { domToReact } from "html-react-parser";
import { memo } from "react";
import Carousel from "./carousel/carousel";

function PostBodyCarouselContent({ domNode }) {
  console.log({ domNode });
  const children = domNode.children.filter((item) => item.type === "tag");
  return (
    <Carousel>
      <div className="embla__container embla__container-1">
        {domToReact(children)}
      </div>
    </Carousel>
  );
}

export default memo(PostBodyCarouselContent);
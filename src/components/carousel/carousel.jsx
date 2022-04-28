import useEmblaCarousel from "embla-carousel-react";
import { memo, useCallback, useEffect, useState } from "react";
import { DotButton, NextButton, PrevButton } from "./button";

function EmblaCarousel({ children, onResize, arrow }) {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    loop: true,
    align: "start",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );
  const onResizeSize = useCallback(() => {
    embla && onResize?.(embla);
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("resize", onResizeSize);
  }, [embla, setScrollSnaps, onSelect, onResizeSize]);


  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          {children}
        </div>
        {arrow ? (
          <>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default memo(EmblaCarousel)
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { fetchBanner } from "../lib/meaAPI";
import Carousel from "./carousel/carousel";

function Banner({ className, height = 178 }) {
  const [banners, setBanners] = useState([]);
  const getBanner = async () => {
    const response = await fetchBanner();
   setBanners(response.data);
  };

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  if (!banners.length) return <></>;

  return (
    <div className={className}>
      <Carousel arrow={false}>
        <div className="embla__container embla__container-1">
          {banners.map((item, index) => (
            <div className="embla__slide" key={index}>
              <Image src={item.image} height={height} width={1140} />
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export default memo(Banner);
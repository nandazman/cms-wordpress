import cn from "classnames";
import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import Accordion from "./accordion";
import PostBodyContentCarousel from "./post-body-carousel-content";
import PostBodyMediaCarousel from "./post-body-carousel-media";
import PostBodyVideo from "./post-body-video";
import styles from './post-body.module.scss';

export default function PostBody({ content }) {
  const getVideoId = (url) => {
    if (!url) return;
    const splitUrl = url.split("/");
    let videoId = splitUrl[splitUrl.length - 1];
    if (!videoId) return;
    if (videoId.includes("watch?v=")) {
      const splittedId = videoId.split("=");
      videoId = splittedId[splittedId.length - 1];
    }
    return videoId
  }

  return (
    <div className="mx-auto">
      <div className={styles.content}>
        {parse(content, {
          replace: (domNode) => {
            const { attribs, children, name } = domNode;
            if (!attribs) {
              return;
            }

            if (attribs.class === "elementor-image-box-img" && name === "figure") {
              const child = domNode.children.find(({ name }) => name === "img");
              if (!child) return;
              return (
                <figure className="elementor-image-box-img w-[30%] mx-auto mb-20px">
                  <Image
                    src={child.attribs.src}
                    alt={child.attribs.alt}
                    width={child.attribs.width || "216px"}
                    height={child.attribs.height || "144px"}
                  />
                </figure>
              );
            }

            if (attribs.class === "swiper-wrapper elementor-slides") {
              return (
                <div className="my-32px">
                  <PostBodyContentCarousel domNode={domNode} />
                </div>
              );
            }
            
            if (attribs.class === "swiper-wrapper") {
              return (
                <div className="my-32px">
                  <PostBodyMediaCarousel domNode={domNode} />
                </div>
              );
            }

            if (attribs.class === "elementor-image-box-content") {
              domNode.attribs.class = cn(attribs.class, "text-center");
              return;
            }

            if (
              attribs.src?.includes("image/png;base64") ||
              attribs.class?.includes("elementor-swiper-button")
            ) {
              return <></>;
            }

            if (attribs.class === "elementor-toggle") {
              domNode.attribs.class = "my-32px";
              return;
            }

            if (attribs.class === "elementor-toggle-item") {
              return <Accordion>{children}</Accordion>;
            }

            if (
              attribs.href &&
              attribs.href.includes("www.komunitasmea.web.id/")
            ) {
              const link = attribs.href.split("www.komunitasmea.web.id/")[1];
              const path = link.includes("tag") || link.includes("category") ? "/articles/" : "/article/"

              if (!link) return
              return (
                <Link href={path + link}>
                  <a>{domNode.children[0].data}</a>
                </Link>
              );
            }

           
            if (attribs.class?.includes("elementor-heading-title") && name === "h1") {
              return <></>;
            }

            if (attribs.class?.includes("elementor-cta--layout-image-right")) {
              domNode.attribs.class = cn(
                domNode.attribs.class,
                styles.elementorctaright
              );
            }

            if (attribs.class?.includes("elementor-cta--layout-image-left")) {
              domNode.attribs.class = cn(
                domNode.attribs.class,
                styles.elementorctaleft
              );
            }
            if (attribs.class === "elementor-cta") {
              domNode.attribs.class = cn("elementor-cta", styles.elementorcta);
              return domNode;
            }
            if (attribs.style === "position:absolute; top:0; left:-9999px;") {
              return <></>;
            }

            if (attribs.class?.includes("elementor-cta__button-wrapper")) {
              const element = domNode.children.find((item) => item.type === "tag")
              const href = element.attribs.href;
              if (!href) return;
              const link = href?.includes("www.komunitasmea.web.id")
                ? `/article${href.split("www.komunitasmea.web.id")[1]}`
                : href;
              return (
                <div className="elementor-cta__button-wrapper elementor-cta__content-item elementor-content-item">
                  <Link href={link}>
                    <a className="cursor-pointer">{element.children[0].data}</a>
                  </Link>
                </div>
              );
            }
            
            if (attribs.class === "elementor-video") {
              const setting =
                domNode.parent.parent.parent.attribs["data-settings"];

              if (!setting) return;

              const parsedSetting = JSON.parse(setting);
              const videoId = getVideoId(parsedSetting.youtube_url);
              return (
                <PostBodyVideo className="my-32px" videoId={videoId} />
              );
            }
            if (attribs.class === "elementor-image") {
              const childs = domNode.childNodes;
              if (!childs) return;

              let src = "";

              for (let i = 0; i < childs.length; i++) {
                const child = childs[i];
                if (child.name === "a") {
                  const link = child.attribs.href;
                  const image = child.children.find((item) => item.name === "img");
                  
                  return (
                    <div className="elementor-image text-center mb-32px">
                      <Link href={link}>
                        <a>
                          <Image
                            src={image.attribs.src}
                            alt={image.attribs.alt}
                            width={image.attribs.width}
                            height={image.attribs.height}
                            layout="fixed"
                          />
                        </a>
                      </Link>
                    </div>
                  );
                }
                if (child.name !== "img") continue;
                src = domNode.childNodes[i].attribs.src;   
                if (!src) return;
                
                const alt = domNode.childNodes[i].attribs.alt;   
                const width = domNode.childNodes[i].attribs.width || "720px";
                const height = domNode.childNodes[i].attribs.height || "480px";
                return (
                  <div className="elementor-image text-center mb-32px">
                    <Image
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      layout="responsive"
                    />
                  </div>
                );
              }
            }

            if (attribs.class === "prettify") {
              return (
                <span style={{ color: "hotpink" }}>
                  {domToReact(children)}
                </span>
              );
            }
          },
        })}
      </div>
    </div>
  );
}

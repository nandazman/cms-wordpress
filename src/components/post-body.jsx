import cn from "classnames";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
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

            if (attribs.class === "elementor-image-box-img") {
              console.log({ domNode });
            }

            if (attribs.src?.includes("image/png;base64")) {
              return <></>;
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
                <PostBodyVideo videoId={videoId} />
              );
            }
            if (attribs.class === "elementor-image") {
              const childs = domNode.childNodes;
              if (!childs) return;

              let src = "";

              for (let i = 0; i < childs.length; i++) {
                const child = childs[i];
                if (child.name !== "img") continue;
                src = domNode.childNodes[i].attribs.src;   
                if (!src) return;
                
                const alt = domNode.childNodes[i].attribs.alt;     
                return (
                  <div className="elementor-image text-center">
                    <Image
                      src={src}
                      alt={alt}
                      width={domNode.childNodes[i].attribs.width}
                      height={domNode.childNodes[i].attribs.height}
                    />
                  </div>
                );
              }
            }

            if (attribs.class === "prettify") {
              return (
                <span style={{ color: "hotpink" }}>
                  {domToReact(children, options)}
                </span>
              );
            }
          },
        })}
      </div>
    </div>
  );
}

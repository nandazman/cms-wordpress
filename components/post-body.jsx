import parse from "html-react-parser";
import Image from "next/image";
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
    <div className="max-w-2xl mx-auto">
      <div className={styles.content}>
        {parse(content, {
          replace: (domNode) => {
            const { attribs, children } = domNode;
            if (!attribs) {
              return;
            }
            if (attribs.class === "elementor-cta__bg-wrapper") {
              console.log({ domNode }, attribs.class);
            }
            if (attribs.style === "position:absolute; top:0; left:-9999px;") {
              return <></>;
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
                  <div className="elementor-image">
                    <Image
                      src={src}
                      alt={alt}
                      width={domNode.childNodes[i].attribs.width}
                      height={domNode.childNodes[i].attribs.height}
                      layout="responsive"
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

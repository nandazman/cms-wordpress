import parse from "html-react-parser";
import { useAmp } from "next/amp";
import Image from "next/image";
import styles from './post-body.module.css';

export default function PostBody({ content }) {
  const isAmp = useAmp();
  const player = {};

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

  const initYotube = (id, containerPlaceholder) => {
    if (!window.YT) {
      injectScript(id, containerPlaceholder);
    } else {
      loadVideo(id, containerPlaceholder);
    }
    
  };

  const injectScript = (id, containerPlaceholder) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;

    window.onYouTubeIframeAPIReady = () => loadVideo(id, containerPlaceholder);
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  const loadVideo = (id, containerPlaceholder) => {
    containerPlaceholder.remove();
    const newPlayer = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady(e) {
          onPlayerReady(e);
        },
      },
      playerVars: { rel: 0, showinfo: 0, ecver: 2 },
    });

    player[id] = newPlayer;
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={styles.content}>
        {parse(content, {
          replace: (domNode) => {
            const { attribs, children } = domNode;

            if (!attribs) {
              return;
            }

            if (attribs.class === "elementor-video") {
              const setting =
                domNode.parent.parent.parent.attribs["data-settings"];
              
              if (!setting) return;

              const parsedSetting = JSON.parse(setting);
              const videoId = getVideoId(parsedSetting.youtube_url);
              return (
                <div className="video-container">
                  <div className="elementor-video mx-auto w-full" id={`youtube-player-${videoId}`}></div>
                  <div className="relative">
                    <Image
                      src={`https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`}
                      alt={videoId}
                      width={16}
                      height={9}
                      layout="responsive"
                    />
                    <div
                      className={styles.play}
                      onClick={(e) => {
                        const containerPlaceholder =
                          e.target.closest(".relative");
                        initYotube(videoId, containerPlaceholder);
                      }}
                    >
                      <div></div>
                    </div>
                  </div>
                </div>
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

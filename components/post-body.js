import parse from "html-react-parser";
import { useAmp } from "next/amp";
import Image from "next/image";
import { useEffect } from "react";
import styles from './post-body.module.css';

export default function PostBody({ content }) {
  const isAmp = useAmp();
  const player = {};
  useEffect(() => {
    return;
    const videoContainer = document.querySelectorAll(".elementor-video");
    if (!videoContainer.length) {
      return;
    };

    const videos = [];
    for (let i = 0; i < videoContainer.length; i++) {
      const container = videoContainer[0];
      const videoElement = container.closest('[data-element_type="widget"]');
      if (!videoElement) continue;

      const setting = videoElement.getAttribute("data-settings");

      if (!setting) continue;

      const parsedSetting = JSON.parse(setting);
      const url = parsedSetting.youtube_url;

      if (!url) return;
      const splitUrl = url.split("/");
      let videoId = splitUrl[splitUrl.length - 1];
      if (!videoId) return;
      if (videoId.includes("watch?v=")) {
        const splittedId = videoId.split("=");
        videoId = splittedId[splittedId.length - 1];
        if (!videoId) continue;
      }
      container.id = `youtube-player-${videoId}`;
      if (isAmp) {

        continue;
      };
      videos.push(videoId);
    }

    
    if (isAmp) return;

    if (!window.YT) {
      initYotube(videos);
    } else {
      // If script is already there, load the video directly
      loadVideo(videos);
    }
  });

  const initYotube = (ids) => {
    // If not, load the script asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;

    // onYouTubeIframeAPIReady will load the video after the script is loaded
    window.onYouTubeIframeAPIReady = () => loadVideo(ids);

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  const loadVideo = (ids) => {
    ids.forEach((item) => {
      // the Player object is created uniquely based on the id in props
      const newPlayer = new window.YT.Player(`youtube-player-${item}`, {
        videoId: item,
        events: {
          onReady: onPlayerReady,
        },
        playerVars: { rel: 0, showinfo: 0, ecver: 2 },
      });

      player[item] = newPlayer;
    });
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

            if (attribs.class === "elementor-image") {
              console.log({ domNode });
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

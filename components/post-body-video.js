import { useAmp } from "next/amp";
import Image from "next/image";
import styles from "./post-body-video.module.css";

export default function PostBodyVideo({ videoId }) {
  const isAmp = useAmp();
  const player = {};

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
  };

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
    <div className={styles.videoContainer}>
      <div
        className="elementor-video mx-auto w-full"
        id={`youtube-player-${videoId}`}
      ></div>
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
            const containerPlaceholder = e.target.closest(".relative");
            initYotube(videoId, containerPlaceholder);
          }}
        >
          <div></div>
        </div>
      </div>
    </div>
  );
}
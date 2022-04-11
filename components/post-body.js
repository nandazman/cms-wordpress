import parse from "html-react-parser";
import { useEffect } from "react";
import styles from './post-body.module.css';

export default function PostBody({ content }) {
  const player = {};
  useEffect(() => {
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
      console.log({ parsedSetting });
      const url = parsedSetting.youtube_url;

      if (!url) return;
      const splitUrl = url.split("/");
      const videoId = splitUrl[splitUrl.length - 1];

      if (!videoId) return;
      videoElement.id = `youtube-player-${videoId}`;
      videos.push(videoId);
    }

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
      <div className={styles.content}>{parse(content)}</div>
    </div>
  );
}

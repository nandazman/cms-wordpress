import styles from "./video-play-button.module.scss";

export default function VideoPlayButton({ onClick }) {
  return (
    <div className={styles.play}>
      <div
        onClick={(e) => {
          return onClick?.(e);
        }}
      ></div>
    </div>
  );
}
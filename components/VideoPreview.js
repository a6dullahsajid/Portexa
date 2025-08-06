'use client';

import { useRef, useState, useEffect } from 'react';
import styles from "../app/globals.module.css";

export default function VideoPreview({ src, poster, width = 200, height = 120 }) {
  const videoRef = useRef(null);
  // 1. Add state to manage play/pause for touch devices
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      // The play() method returns a promise. We'll handle it to avoid console errors.
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented.
          console.error("Video play was prevented:", error);
        });
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  // 2. Create a single click handler for touch interaction
  const handleClick = () => {
    if (isPlaying) {
      handlePause();
      setIsPlaying(false);
    } else {
      handlePlay();
      setIsPlaying(true);
    }
  };

  return (
    <video
      ref={videoRef}
      className={styles.exampleVideo}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onMouseEnter={handlePlay}
      onMouseLeave={handleReset}
      onFocus={handlePlay}
      onBlur={handleReset}
      onClick={handleClick}
      title={`Portfolio example preview: ${src.split('/').pop().replace('.mp4', '')}`}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
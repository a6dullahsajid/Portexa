'use client';

import { useRef } from 'react';

export default function VideoPreview({ src, poster, width = 200, height = 120 }) {
  const videoRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <video
      ref={videoRef}
      className="exampleVideo"
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

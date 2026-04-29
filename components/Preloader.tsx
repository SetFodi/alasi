'use client';
import { useEffect, useRef, useState } from 'react';

const VIDEO_PAUSE_AT_SECONDS = 3;
const PRELOADER_SLIDE_AT_MS = 3200;
const PRELOADER_REMOVE_AT_MS = 4400;

export default function Preloader() {
  const [gone, setGone] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const slideTimer = setTimeout(() => {
      setSlideUp(true);
      document.body.style.overflow = '';
    }, PRELOADER_SLIDE_AT_MS);
    const removeTimer = setTimeout(() => setGone(true), PRELOADER_REMOVE_AT_MS);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  function pauseVideoAtCutoff(video: HTMLVideoElement) {
    if (video.currentTime >= VIDEO_PAUSE_AT_SECONDS) {
      video.pause();
    }
  }

  if (gone) return null;

  return (
    <div id="preloader" className={slideUp ? 'slide-up' : ''}>
      <div className="preloader-stripes">
        {[0,1,2,3,4].map(i => (
          <div key={i} className="pre-stripe" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="preloader-content">
        <div className="preloader-video-wrapper">
          <video
            ref={videoRef}
            className="preloader-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={(event) => pauseVideoAtCutoff(event.currentTarget)}
          >
            <source src="/uploads/Premium_Awning_Animation_Generation_alpha.webm" type="video/webm" />
          </video>
        </div>
        <img className="preloader-logo" src="/uploads/alasi-logo-transparent.png" alt="Alasi" />
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" />
        </div>
        <div className="preloader-subtext">
          <span>ბათუმი</span>
          <span className="pre-dot" />
          <span>Batumi</span>
          <span className="pre-dot" />
          <span>Black Sea</span>
        </div>
      </div>
    </div>
  );
}

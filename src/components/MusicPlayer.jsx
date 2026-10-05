import { useEffect } from 'react';

let audioInstance = null;

export default function MusicPlayer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__bgAudio) {
      audioInstance = window.__bgAudio;
    } else if (!audioInstance) {
      audioInstance = new Audio('/music.mp3');
      audioInstance.loop = true;
      audioInstance.volume = 0.7;
      audioInstance.preload = 'auto';
    }

    const tryPlay = () => {
      if (!audioInstance || !audioInstance.paused) return;
      const playPromise = audioInstance.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('[BGM] Musik aktif berputar di latar belakang! 🎵');
            cleanup();
          })
          .catch(() => {});
      }
    };

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'pointerup', 'keydown', 'scroll', 'wheel'];
    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, tryPlay, true);
        document.removeEventListener(evt, tryPlay, true);
      });
    };

    tryPlay();

    events.forEach((evt) => {
      window.addEventListener(evt, tryPlay, { capture: true, passive: true });
      document.addEventListener(evt, tryPlay, { capture: true, passive: true });
    });

    return () => {
      cleanup();
    };
  }, []);

  return null;
}

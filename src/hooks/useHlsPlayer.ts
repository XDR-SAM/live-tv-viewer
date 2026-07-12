import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";

export interface QualityLevel {
  level: number;
  label: string;
  height?: number;
  bitrate?: number;
}

interface ReturnType {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  qualities: QualityLevel[];
  currentQuality: number;
  setQuality: (level: number) => void;
  isPlaying: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
}

export function useHlsPlayer(url: string): ReturnType {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [qualities, setQualities] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!Hls.isSupported()) {
      setError("HLS is not supported in this browser.");
      return;
    }
    if (hlsRef.current) {
      try { hlsRef.current.destroy(); } catch {}
    }
    const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hlsRef.current = hls;
    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      const list: QualityLevel[] = data.levels.map((lvl, i) => ({
        level: i,
        label: lvl.height ? `${lvl.height}p` : `Level ${i + 1}`,
        height: lvl.height,
        bitrate: lvl.bitrate,
      }));
      setQualities(list);
      const preferred = list.find((q) => q.label === "720p");
      const initial = preferred ? preferred.level : -1;
      setCurrentQuality(initial);
      hls.currentLevel = initial;
      video.play().catch(() => {});
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) setError(`Stream error: ${data.type}`);
    });

    return () => {
      try { hls.destroy(); } catch {}
    };
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDuration = () => setDuration(video.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onDuration);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onDuration);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const setQuality = (level: number) => setCurrentQuality(level);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return { videoRef, qualities, currentQuality, setQuality, isPlaying, error, currentTime, duration, togglePlay };
}

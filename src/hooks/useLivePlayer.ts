import { useState, useEffect, useRef, useCallback } from "react";
import Hls from "hls.js";

export interface QualityLevel {
  level: number;
  label: string;
}

export type PlayerStatus = "idle" | "loading" | "ready" | "playing" | "buffering" | "error";

export interface UseLivePlayerState {
  status: PlayerStatus;
  error: string | null;
  loading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  pip: boolean;
  fullscreen: boolean;
  activeQuality: string;
}

export interface UseLivePlayerActions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  load: (url: string) => void;
  retry: () => void;
  togglePlay: () => void;
  togglePip: () => void;
  toggleFullscreen: () => void;
}

export interface UseLivePlayerResult extends UseLivePlayerState, UseLivePlayerActions {}

const initialState: UseLivePlayerState = {
  status: "idle",
  error: null,
  loading: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  pip: false,
  fullscreen: false,
  activeQuality: "auto",
};

export function useLivePlayer(videoRef: React.RefObject<HTMLVideoElement | null>, url?: string): UseLivePlayerResult {
  const hlsRef = useRef<Hls | null>(null);
  const timeRef = useRef<number | null>(null);
  const urlRef = useRef<string | undefined>(url);

  const [state, setState] = useState<UseLivePlayerState>(initialState);

  const stopHls = useCallback(() => {
    if (hlsRef.current) {
      try { hlsRef.current.destroy(); } catch { /* empty */ }
      hlsRef.current = null;
    }
  }, []);

  const stopTime = useCallback(() => {
    if (timeRef.current !== null) {
      cancelAnimationFrame(timeRef.current);
      timeRef.current = null;
    }
  }, []);

  const startTime = useCallback(() => {
    stopTime();
    const tick = () => {
      const video = videoRef.current;
      if (!video) return;
      setState((prev) => ({
        ...prev,
        currentTime: video.currentTime || 0,
        duration: video.duration || 0,
        isPlaying: !video.paused,
        status: video.paused ? "ready" : "playing",
      }));
      timeRef.current = requestAnimationFrame(tick);
    };
    timeRef.current = requestAnimationFrame(tick);
  }, [videoRef]);

  const load = useCallback(
    (nextUrl: string) => {
      const video = videoRef.current;
      if (!video) return;
      stopHls();
      stopTime();
      urlRef.current = nextUrl;
      setState((prev) => ({
        ...prev,
        status: "loading",
        error: null,
        loading: true,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        pip: false,
        fullscreen: false,
        activeQuality: "auto",
      }));

      if (!Hls.isSupported()) {
        setState((prev) => ({ ...prev, status: "error", error: "HLS is not supported in this browser.", loading: false }));
        return;
      }

      const hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
      hlsRef.current = hls;
      hls.loadSource(nextUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setState((prev) => ({ ...prev, status: "ready", loading: false }));
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_event: any, data: { level: number }) => {
        setState((prev) => ({ ...prev, activeQuality: data.level >= 0 ? `level-${data.level}` : "auto" }));
      });

      hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        if (data.fatal) {
          stopHls();
          stopTime();
          setState((prev) => ({ ...prev, status: "error", error: data.type, loading: false, isPlaying: false }));
        }
      });

      video.addEventListener("waiting", () => setState((prev) => (prev.status === "playing" ? { ...prev, status: "buffering" } : prev)));
      video.addEventListener("playing", () => setState((prev) => ({ ...prev, status: "playing", isPlaying: true })));
      video.addEventListener("pause", () =>
        setState((prev) => ({ ...prev, isPlaying: false, status: prev.status === "buffering" ? "ready" : prev.status }))
      );
      video.addEventListener("canplay", () => setState((prev) => (prev.status === "buffering" ? { ...prev, status: "playing" } : prev)));
      video.addEventListener("loadeddata", () => setState((prev) => ({ ...prev, status: "ready" })));
      video.addEventListener("ended", () => setState((prev) => ({ ...prev, status: "ready", isPlaying: false })));

      startTime();
    },
    [startTime, stopHls, stopTime, videoRef]
  );

  const retry = useCallback(() => {
    if (urlRef.current) load(urlRef.current);
  }, [load]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }, [videoRef]);

  const togglePip = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!document.pictureInPictureElement) {
        await video.requestPictureInPicture();
        setState((prev) => ({ ...prev, pip: true }));
      } else {
        await document.exitPictureInPicture();
        setState((prev) => ({ ...prev, pip: false }));
      }
    } catch { /* empty */ }
  }, [videoRef]);

  const toggleFullscreen = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const entering = !document.fullscreenElement;
    setState((prev) => ({ ...prev, fullscreen: entering }));
    if (entering) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, [videoRef]);

  useEffect(() => {
    const handleFs = () => setState((prev) => ({ ...prev, fullscreen: !!document.fullscreenElement }));
    document.addEventListener("fullscreenchange", handleFs);
    return () => document.removeEventListener("fullscreenchange", handleFs);
  }, []);

  useEffect(() => {
    if (url) {
      urlRef.current = url;
      load(url);
    }
    return () => {
      stopHls();
      stopTime();
    };
    // @see intentionally once per url change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state, videoRef, load, retry, togglePlay, togglePip, toggleFullscreen };
}

export default useLivePlayer;

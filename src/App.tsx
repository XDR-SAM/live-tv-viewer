import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import ChannelList from "./ChannelList";
import LivePlayer from "./components/LivePlayer";
import type { Channel } from "./data/channels";
import { channels } from "./data/channels";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState<Channel>(() => channels[0]);
  const [qualities, setQualities] = useState<{ label: string; level: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pip, setPip] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return true;
    const raw = localStorage.getItem("live-tv:sidebar-open");
    if (raw !== null) return raw === "true";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return true;
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    try {
      localStorage.setItem("live-tv:sidebar-open", String(sidebarOpen));
    } catch {
      // ignore storage errors
    }
  }, [sidebarOpen]);

  const retry = () => {
    if (!selected.url) return;
    setError(null);
    setLoading(true);
    const video = videoRef.current;
    if (!video) return;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (!Hls.isSupported()) {
      setError("HLS is not supported in this browser.");
      setLoading(false);
      return;
    }
    const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hlsRef.current = hls;
    hls.loadSource(selected.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      const list = data.levels.map((lvl, i) => ({
        label: lvl.height ? `${lvl.height}p` : `Level ${i + 1}`,
        level: i,
      }));
      setQualities(list);
      const auto720 = list.find((l) => l.label === "720p");
      const initial = auto720 ? auto720.level : -1;
      setCurrentQuality(initial);
      hls.currentLevel = initial;
      video.play().catch(() => {});
      setLoading(false);
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        setError(`Stream error: ${data.type}`);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (!Hls.isSupported()) {
      setError("HLS is not supported in this browser.");
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);
    setQualities([]);
    setCurrentQuality(-1);
    setCurrentTime(0);
    setDuration(0);
    setPip(false);

    const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hlsRef.current = hls;
    hls.loadSource(selected.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      const list = data.levels.map((lvl, i) => ({
        label: lvl.height ? `${lvl.height}p` : `Level ${i + 1}`,
        level: i,
      }));
      setQualities(list);
      const auto720 = list.find((l) => l.label === "720p");
      const initial = auto720 ? auto720.level : -1;
      setCurrentQuality(initial);
      hls.currentLevel = initial;
      video.play().catch(() => {});
      setLoading(false);
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        setError(`Stream error: ${data.type}`);
        setLoading(false);
      }
    });

    const onTimeUpdate = () => setCurrentTime(video.currentTime || 0);
    const onDurationChange = () => setDuration(video.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onLoadedData = () => setLoading(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      try {
        video.pause();
      } catch {
        // ignore
      }
      hls.destroy();
      hlsRef.current = null;
    };
  }, [selected.url]);

  const handleSelect = (ch: Channel) => {
    setSelected(ch);
    setError(null);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleQualityChange = (level: number) => {
    setCurrentQuality(level);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!document.pictureInPictureElement) {
        await video.requestPictureInPicture();
        setPip(true);
      } else {
        await document.exitPictureInPicture();
        setPip(false);
      }
    } catch {
      // gracefully skip
    }
  };

  return (
    <div className="app">
      <ChannelList
        channels={channels}
        selected={selected}
        onSelect={handleSelect}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      <main className="main">
        <div className="player-wrap">
          <LivePlayer
            videoRef={videoRef}
            isPlaying={isPlaying}
            error={error}
            loading={loading}
            currentTime={currentTime}
            duration={duration}
            pip={pip}
            onTogglePlay={() => {
              const video = videoRef.current;
              if (!video) return;
              if (video.paused) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            }}
            activeChannelName={selected.name}
            onRetry={retry}
            onTogglePip={togglePip}
          />
        </div>
        <div className="controls">
          <div className="now-playing">
            <div>
              <h2>{selected.name}</h2>
              <p className="muted">{selected.group}</p>
            </div>
          </div>
          <div className="quality">
            <label htmlFor="quality" className="muted">Quality</label>
            <div className="quality-select">
              <select
                id="quality"
                value={currentQuality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                disabled={qualities.length === 0}
              >
                <option value="-1">Auto</option>
                {qualities.map((q) => (
                  <option key={q.level} value={q.level}>
                    {q.label}
                  </option>
                ))}
              </select>
              <span className="quality-active" aria-hidden="true">
                {currentQuality === -1
                  ? "AUTO"
                  : qualities[qualities.findIndex((q) => q.level === currentQuality)]?.label ??
                    "AUTO"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import ChannelList from "./ChannelList";
import type { Channel } from "./data/channels";
import { channels } from "./data/channels";

export default function App() {
  const [selected, setSelected] = useState<Channel>(() => channels[0]);
  const [qualities, setQualities] = useState<{ label: string; level: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const handleSelect = (ch: Channel) => {
    setLoading(true);
    setSelected(ch);
    setError(null);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!Hls.isSupported()) {
      setError("HLS is not supported in this browser.");
      setLoading(false);
      return;
    }

    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
    });
    hlsRef.current = hls;
    hls.loadSource(selected.url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      const list = data.levels.map((lvl, i) => ({
        label: lvl.height ? `${lvl.height}p` : `Level ${i + 1}`,
        level: i,
      }));
      setQualities(list);
      const auto = list.find((l) => l.label === "720p")
        ? list.find((l) => l.label === "720p")!.level
        : -1;
      setCurrentQuality(auto);
      hls.currentLevel = auto;
      setLoading(false);
      video.play().catch(() => {});
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        setError(`Stream error: ${data.type}`);
        setLoading(false);
      }
    });

    return () => {
      hls.destroy();
    };
  }, [selected.url]);

  const handleQualityChange = (level: number) => {
    setCurrentQuality(level);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  return (
    <div className="app">
      <ChannelList channels={channels} selected={selected} onSelect={handleSelect} />
      <main className="main">
        <div className="player-wrap">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="player"
          />
          {loading && (
            <div className="overlay">
              <span className="live-badge">LIVE</span>
              <div>Loading {selected.name}…</div>
            </div>
          )}
          {error && <div className="error-overlay">{error}</div>}
        </div>
        <div className="controls">
          <div className="now-playing">
            <div>
              <h2>{selected.name}</h2>
              <p className="muted">{selected.category}</p>
            </div>
          </div>
          <div className="quality">
            <label htmlFor="quality" className="muted">Quality</label>
            <select
              id="quality"
              value={currentQuality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              disabled={qualities.length === 0}
              className="select"
            >
              <option value="-1">Auto</option>
              {qualities.map((q) => (
                <option key={q.level} value={q.level}>{q.label}</option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}

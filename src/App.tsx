import { useState, useEffect, useRef } from "react";
import ChannelList from "./ChannelList";
import LivePlayer from "./components/LivePlayer";
import { useLivePlayer } from "./hooks/useLivePlayer";
import { channels } from "./data/channels";
import type { Channel } from "./data/channels";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState<Channel>(() => channels[0]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return true;
    const raw = localStorage.getItem("live-tv:sidebar-open");
    if (raw !== null) return raw === "true";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    try {
      localStorage.setItem("live-tv:sidebar-open", String(sidebarOpen));
    } catch {
      // ignore
    }
  }, [sidebarOpen]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const player = useLivePlayer(videoRef, selected.url);

  const handleSelect = (ch: Channel) => {
    setSelected(ch);
    setSidebarOpen(false);
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
            status={player.status}
            error={player.error}
            loading={player.loading}
            isPlaying={player.isPlaying}
            currentTime={player.currentTime}
            duration={player.duration}
            pip={player.pip}
            fullscreen={player.fullscreen}
            qualities={[]}
            currentQuality={-1}
            bufferedTo={player.currentTime}
            activeChannelName={selected.name}
            onTogglePlay={player.togglePlay}
            onRetry={player.retry}
            onTogglePip={player.togglePip}
            onToggleFullscreen={player.toggleFullscreen}
            onSetQuality={() => {}}
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
              <span className="quality-active" aria-hidden="true">AUTO</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

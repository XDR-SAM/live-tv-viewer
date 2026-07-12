import type { ReactNode } from "react";

export interface LivePlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  activeChannelName?: string;
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number): string => n.toString().padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
};

export function LivePlayer({
  videoRef,
  isPlaying,
  error,
  currentTime,
  duration,
  onTogglePlay,
  activeChannelName,
}: LivePlayerProps): ReactNode {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="live-player">
      <div className="video-wrapper">
        <video ref={videoRef} className="video" controls playsInline autoPlay />
        {error && <div className="error-badge">Error: {error}</div>}
      </div>
      <div className="controls">
        <div className="controls-row">
          <button className="icon-btn" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 4.5L19 12L7 19.5V4.5Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <div className="title-block">
            <span className="channel-label">{activeChannelName ?? "No channel selected"}</span>
            <span className="time-badge">
              {formatTime(currentTime)}{duration > 0 ? ` / ${formatTime(duration)}` : ""}
            </span>
          </div>
          <div className="live-indicator" aria-hidden="true">
            <span className="live-dot" />
            <span>LIVE</span>
          </div>
        </div>
        <div className="seek">
          <div className="track">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

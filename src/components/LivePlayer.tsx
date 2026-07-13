import { useCallback } from "react";

export interface QualityLevel {
  level: number;
  label: string;
}

export type PlayerStatus =
  | "idle"
  | "loading"
  | "ready"
  | "playing"
  | "buffering"
  | "error";

export interface LivePlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  status: PlayerStatus;
  error: string | null;
  loading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  pip: boolean;
  fullscreen: boolean;
  activeChannelName?: string;
  onTogglePlay: () => void;
  onRetry?: () => void;
  onTogglePip?: () => void;
  onToggleFullscreen?: () => void;
}

export default function LivePlayer({
  videoRef,
  status,
  error,
  loading,
  isPlaying,
  currentTime,
  duration,
  pip,
  fullscreen,
  activeChannelName,
  onTogglePlay,
  onRetry,
  onTogglePip,
  onToggleFullscreen,
}: LivePlayerProps) {
  const showBuffering = loading || status === "loading" || status === "buffering";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (videoRef.current && duration > 0) {
        videoRef.current.currentTime = ratio * duration;
      }
    },
    [videoRef, duration]
  );

  const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return "0:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const pad = (n: number): string => n.toString().padStart(2, "0");
    if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
    return `${m}:${pad(s)}`;
  };

  return (
    <div className="live-player">
      <div className="live-player-wrap">
        <video ref={videoRef} playsInline className="live-player-video" />

        <div className="live-player-scrim" aria-hidden="true" />

        {error && onRetry && (
          <div className="live-player-center">
            <div className="error-card">
              <div className="error-title">Playback error</div>
              <div className="error-message">{error}</div>
              <button className="retry-btn" onClick={onRetry}>Retry</button>
            </div>
          </div>
        )}

        {!error && showBuffering && (
          <div className="live-player-center">
            <div className="buffer-surface">
              <div className="spinner" />
              <div className="buffer-label">{status === "buffering" ? "Buffering…" : "Loading…"}</div>
            </div>
          </div>
        )}

        {!error && !showBuffering && (
          <button className="live-player-center" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            <span className="playcenter-icon" data-playing={isPlaying} />
          </button>
        )}

        <div className="live-player-controls">
          <div className="controls-row">
            <button className="icon-btn" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 4.5L19 12L7 19.5V4.5Z" fill="currentColor" />
                </svg>
              )}
            </button>

            <div className="title-block">
              <span className="channel-label">{activeChannelName ?? "No channel selected"}</span>
              <span className="time-badge">{formatTime(currentTime)}{duration > 0 ? ` / ${formatTime(duration)}` : ""}</span>
            </div>

            {onTogglePip && (
              <button
                className={`icon-btn ${pip ? "active" : ""}`}
                onClick={onTogglePip}
                aria-pressed={pip}
                aria-label="Picture in Picture"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6H20V14C20 16.2091 18.2091 18 16 18H14V20H10V18H8C5.79086 18 4 16.2091 4 14V6Z" stroke="currentColor" />
                  <path d="M7 8V13C7 13.5523 7.44772 14 8 14H16" stroke="currentColor" strokeLinecap="round" />
                  <rect x="14" y="11" width="6" height="6" rx="1" stroke="currentColor" />
                </svg>
              </button>
            )}

            {onToggleFullscreen && (
              <button className={`icon-btn ${fullscreen ? "active" : ""}`} onClick={onToggleFullscreen} aria-label="Fullscreen">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 3H21V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 21H3V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3L14 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 21L10 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <div className="live-indicator" aria-hidden="true">
              <span className="live-dot" />
              <span>{isPlaying ? "LIVE" : "READY"}</span>
            </div>
          </div>

          <div className="seek" onClick={handleSeek}>
            <div className="track">
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

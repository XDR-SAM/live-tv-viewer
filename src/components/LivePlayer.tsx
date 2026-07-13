import { useCallback, useState, type RefObject } from "react";
import type { ReactNode } from "react";
import "./LivePlayer.css";

export interface LivePlayerProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  error: string | null;
  loading: boolean;
  currentTime: number;
  duration: number;
  pip?: boolean;
  onTogglePlay: () => void;
  activeChannelName?: string;
  onRetry?: () => void;
  onTogglePip?: () => void;
}

export default function LivePlayer({
  videoRef,
  isPlaying,
  error,
  currentTime,
  duration,
  onTogglePlay,
  activeChannelName,
  onRetry,
  onTogglePip,
  pip,
}: LivePlayerProps): ReactNode {
  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState<number | null>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleDoubleClick = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!document.pictureInPictureElement && onTogglePip) {
      try {
        await video.requestPictureInPicture();
        onTogglePip();
      } catch {
        // ignore unsupported environments
      }
    }
  }, [videoRef, onTogglePip]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || duration <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = ratio * duration;
    },
    [videoRef, duration]
  );

  const handleSeekStart = useCallback(() => {
    if (duration <= 0) return;
    setSeeking(currentTime);
  }, [currentTime, duration]);

  const handleSeekMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (seeking === null) return;
      const video = videoRef.current;
      if (!video || duration <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = ratio * duration;
    },
    [seeking, videoRef, duration]
  );

  const handleSeekEnd = useCallback(() => {
    setSeeking(null);
  }, []);

  return (
    <div
      className="live-player"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="live-player-wrap">
        <video
          ref={videoRef}
          playsInline
          className="live-player-video"
          onDoubleClick={handleDoubleClick}
        />
        <div className="live-player-scrim" aria-hidden="true" />
        <button
          className="live-player-center"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span className="playcenter-icon" data-playing={isPlaying} />
        </button>
        <div className={`live-player-controls ${showControls ? "visible" : "faded"}`}>
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
              <span className="time-badge">{formatTime(currentTime)}{duration > 0 ? ` / ${formatTime(duration)}` : ""}</span>
            </div>
            {onTogglePip && (
              <button className="icon-btn" onClick={onTogglePip} aria-pressed={pip} aria-label="Picture in Picture">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6H20V14C20 16.2091 18.2091 18 16 18H14V20H10V18H8C5.79086 18 4 16.2091 4 14V6Z" stroke="currentColor" />
                  <path d="M7 8V13C7 13.5523 7.44772 14 8 14H16" stroke="currentColor" strokeLinecap="round" />
                  <rect x="14" y="11" width="6" height="6" rx="1" stroke="currentColor" />
                </svg>
              </button>
            )}
            <div className="live-indicator" aria-hidden="true">
              <span className="live-dot" />
              <span>LIVE</span>
            </div>
          </div>
          <div
            className="seek"
            onMouseDown={handleSeekStart}
            onMouseMove={handleSeekMove}
            onMouseUp={handleSeekEnd}
            onMouseLeave={handleSeekEnd}
            onClick={handleSeek}
          >
            <div className="track">
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
      {error && onRetry && (
        <div className="error-surface">
          <div className="error-card">
            <div className="error-title">Playback error</div>
            <div className="error-message">{error}</div>
            <button className="retry-btn" onClick={onRetry}>Retry</button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number): string => n.toString().padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}


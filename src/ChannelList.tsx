import { useState, type ReactNode } from "react";
import type { Channel } from "./data/channels";
import "./ChannelList.css";

type Props = {
  channels: Channel[];
  selected: Channel;
  onSelect: (ch: Channel) => void;
  sidebarOpen?: boolean;
  onCloseSidebar?: () => void;
};

export default function ChannelList({ channels, selected, onSelect, sidebarOpen, onCloseSidebar }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const isOpen = sidebarOpen !== undefined ? sidebarOpen : open;

  return (
    <>
      <button
        className="mobile-header"
        onClick={() => setOpen((v: boolean) => !v)}
        aria-expanded={isOpen}
      >
        <span className="mobile-title">Channels</span>
        <span className="mobile-count">{channels.length}</span>
        <span className={`chevron ${isOpen ? "open" : ""}`} aria-hidden="true" />
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div>
            <h1>Live Sport TV</h1>
            <p className="subtitle">Channels</p>
          </div>
          {onCloseSidebar && (
            <button className="sidebar-close" onClick={onCloseSidebar} aria-label="Close sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="channel-list">
          {channels.map((ch) => (
            <button
              key={ch.id}
              className={`channel-btn ${selected.id === ch.id ? "active" : ""}`}
              onClick={() => onSelect(ch)}
            >
              <span className="ch-name">{ch.name}</span>
              <span className="ch-cat muted">{ch.group}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

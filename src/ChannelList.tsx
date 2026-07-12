import { Channel, categories } from "../data/channels";

type Props = {
  channels: Channel[];
  selected: Channel;
  onSelect: (ch: Channel) => void;
};

export default function ChannelList({ channels, selected, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Live Sport TV</h1>
        <p className="subtitle">Sports channels</p>
      </div>
      <div className="channel-list">
        {channels.map(ch => (
          <button
            key={ch.id}
            className={`channel-btn ${selected.id === ch.id ? "active" : ""}`}
            onClick={() => onSelect(ch)}
          >
            <span className="ch-name">{ch.name}</span>
            <span className="ch-cat muted">{ch.category}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

import './QualitySelector.css';

interface QualitySelectorProps {
  qualities: { level: number; label: string; height?: number; bitrate?: number }[];
  currentQuality: number;
  onChange: (levelIndex: number) => void;
}

export function QualitySelector({ qualities, currentQuality, onChange }: QualitySelectorProps) {
  if (qualities.length === 0) return null;

  return (
    <div className="quality-selector">
      <label htmlFor="quality-select">Quality</label>
      <select
        id="quality-select"
        value={currentQuality}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="auto">Auto</option>
        {qualities.map((q) => (
          <option key={q.level} value={q.level}>
            {q.label}
          </option>
        ))}
      </select>
    </div>
  );
}

import type { QualityLevel } from "../hooks/useHlsPlayer";
import "./QualitySelector.css";

interface QualitySelectorProps {
  qualities: QualityLevel[];
  currentQuality: number;
  onChange: (level: number) => void;
}

export function QualitySelector({ qualities, currentQuality, onChange }: QualitySelectorProps) {
  if (qualities.length === 0) return null;
  const sorted = [...qualities].sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
  return (
    <div className="quality-selector">
      <label htmlFor="quality-select">Quality</label>
      <select id="quality-select" value={currentQuality} onChange={(event) => onChange(Number(event.target.value))}>
        <option value="-1">Auto</option>
        {sorted.map((q) => (
          <option key={q.level} value={q.level}>
            {q.label}
          </option>
        ))}
      </select>
    </div>
  );
}

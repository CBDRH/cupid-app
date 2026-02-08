export function classifyEvidence(forValue, againstValue) {

  const total = forValue + againstValue

  // Case 0: no studies
  if (total === 0) return 0;

  // Case 1: 1–2 studies
  if (total === 1 || total === 2) return 1;

  // Cases according to thresholds
  const ratio = forValue / againstValue
  if (forValue === 0) return 2;                          // no positive/mixed
  if (ratio > 0 && ratio < 0.85) return 3;               // <46% positive/mixed
  if (ratio >= 0.85 && ratio <= 1.5) return 4;           // ~50% positive/mixed
  if (ratio > 1.5 && ratio < 2) return 5;                // ≥60% positive/mixed
  if (ratio >= 2) return 6;  
  
  // fallback
  return 0;
}
import React from 'react';

export default function AshokaChakra({ size = 52 }) {
  const cx = 50, cy = 50, outerR = 46, innerR = 7, spokeR = 42;
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: cx + innerR * Math.cos(rad),
      y1: cy + innerR * Math.sin(rad),
      x2: cx + spokeR * Math.cos(rad),
      y2: cy + spokeR * Math.sin(rad),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ashoka Chakra"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#003580" strokeWidth="5" fill="none" />
      {/* Inner hub */}
      <circle cx={cx} cy={cy} r={innerR} fill="#003580" />
      {/* 24 Spokes */}
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1}
          x2={s.x2} y2={s.y2}
          stroke="#003580"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

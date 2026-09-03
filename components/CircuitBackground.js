export default function CircuitBackground({ opacity = 0.5, fixed = false }) {
  return (
    <svg
      className={`${fixed ? "fixed" : "absolute"} inset-0 w-full h-full pointer-events-none`}
      style={{ opacity, zIndex: 0 }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
          <path className="circuit-line" d="M0 60 H40 V20 H90" stroke="#133863" strokeWidth="2" fill="none" />
          <path className="circuit-line" d="M60 0 V40 H120" stroke="#7C838B" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path className="circuit-line" d="M0 100 H50 V120" stroke="#133863" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path className="circuit-line" d="M90 90 H120 M90 90 V60" stroke="#7C838B" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="40" cy="20" r="3" fill="#133863" />
          <circle cx="90" cy="90" r="3" fill="#7C838B" />
          <circle cx="0" cy="60" r="2.5" fill="#7C838B" />
          <circle cx="50" cy="120" r="2.5" fill="#133863" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#circuit)" />
    </svg>
  );
}
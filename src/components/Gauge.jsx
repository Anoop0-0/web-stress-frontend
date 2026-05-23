function Gauge({ latest }) {
  if (!latest) return null;

  const failurePercent = Math.min(latest.failureRate, 100);
  const rpsPercent = Math.min((latest.rps / 200) * 100, 100);

  const circumference = 2 * Math.PI * 30;

  const gauges = [
    {
      label: "Failure Rate",
      value: `${latest.failureRate}%`,
      percent: failurePercent,
      color: latest.failureRate > 10 ? "#ffaa00" : "#00ff41",
    },
    {
      label: "RPS",
      value: latest.rps,
      percent: rpsPercent,
      color: "#00ff41",
    },
  ];

  return (
    <div className="col-span-2 grid grid-cols-2 gap-3">
      {gauges.map((g) => (
        <div key={g.label} className="rounded p-4 flex flex-col items-center"
          style={{ background: "#010a01", border: "1px solid #00ff4111" }}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#0a3a0a" }}>
            ▸ {g.label}
          </p>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="30" fill="none"
              stroke={g.color + "22"} strokeWidth="5"/>
            <circle cx="40" cy="40" r="30" fill="none"
              stroke={g.color}
              strokeWidth="5"
              strokeDasharray={`${(g.percent / 100) * circumference} ${circumference}`}
              strokeDashoffset={circumference * 0.25}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
            <text x="40" y="44" textAnchor="middle"
              fontFamily="monospace" fontSize="12" fill={g.color}>
              {g.value}
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
}

export default Gauge;
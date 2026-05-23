function StatsBar({ latest }) {
  if (!latest) return null;

  const stats = [
    { label: "Total Req", value: latest.total, color: "#00ff41" },
    { label: "Successful", value: latest.successful, color: "#00ff41" },
    { label: "Failed", value: latest.failed, color: latest.failed > 0 ? "#ffaa00" : "#00ff41" },
    { label: "Avg RT", value: `${latest.avgResponseTime}ms`, color: "#00ff41" },
    { label: "RPS", value: latest.rps, color: "#00ff41" },
    { label: "Fail Rate", value: `${latest.failureRate}%`, color: latest.failureRate > 10 ? "#ffaa00" : "#00ff41" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="stat-card rounded p-3 text-center relative"
          style={{ background: "#010a01", border: "1px solid #00ff4111" }}
        >
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#0a3a0a" }}>
            {stat.label}
          </p>
          <p className="text-xl" style={{ color: stat.color }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
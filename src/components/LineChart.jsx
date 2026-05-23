import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function LineChart({ metrics }) {
  const data = metrics.map((m, i) => ({ ...m, index: i + 1 }));

  return (
    <div className="rounded p-4" style={{ background: "#010a01", border: "1px solid #00ff4111" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#0a3a0a" }}>
        ▸ Response Time — ms / batch
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00ff4108" />
          <XAxis
            dataKey="index"
            stroke="#0a3a0a"
            tick={{ fill: "#0a3a0a", fontSize: 10 }}
            label={{ value: "Batch", position: "insideBottom", fill: "#0a3a0a", fontSize: 10 }}
          />
          <YAxis
            stroke="#0a3a0a"
            tick={{ fill: "#0a3a0a", fontSize: 10 }}
            label={{ value: "ms", angle: -90, position: "insideLeft", fill: "#0a3a0a", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{ background: "#010a01", border: "1px solid #00ff4133", borderRadius: "4px", fontFamily: "monospace" }}
            labelStyle={{ color: "#0a3a0a", fontSize: 10 }}
            itemStyle={{ color: "#00ff41", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="avgResponseTime"
            stroke="#00ff41"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "#00ff41" }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
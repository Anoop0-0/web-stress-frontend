import StatsBar from "./StatsBar";
import LineChart from "./LineChart";
import Gauge from "./Gauge";

function Dashboard({ metrics, isRunning, isComplete }) {
  const latest = metrics[metrics.length - 1];

  return (
    <div className="dashboard-panel h-full rounded-lg p-4 relative"
  style={{ background: "#020d02", border: "1px solid #00ff4122" }}>

      <span className="absolute top-0 left-0 w-2 h-2" style={{ borderTop: "1px solid #00ff41", borderLeft: "1px solid #00ff41" }}/>
      <span className="absolute top-0 right-0 w-2 h-2" style={{ borderTop: "1px solid #00ff41", borderRight: "1px solid #00ff41" }}/>
      <span className="absolute bottom-0 left-0 w-2 h-2" style={{ borderBottom: "1px solid #00ff41", borderLeft: "1px solid #00ff41" }}/>
      <span className="absolute bottom-0 right-0 w-2 h-2" style={{ borderBottom: "1px solid #00ff41", borderRight: "1px solid #00ff41" }}/>

      {isRunning && (
        <div className="flex items-center gap-2 mb-4 text-xs tracking-widest uppercase" style={{ color: "#00ff41" }}>
          <span className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }}/>
          BATCH {latest?.batchNumber} / {latest?.totalBatches} — RUNNING
        </div>
      )}

      {isComplete && (
        <div className="mb-4 text-xs tracking-widest uppercase" style={{ color: "#00ff41" }}>
          ✓ TEST COMPLETE
        </div>
      )}

      <StatsBar latest={latest} />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <LineChart metrics={metrics} />
        </div>
        <Gauge latest={latest} />
      </div>
    </div>
  );
}

export default Dashboard;
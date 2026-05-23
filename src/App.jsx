import { useState } from "react";
import TestForm from "./components/TestForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="min-h-screen p-6 flex flex-col" style={{ background: "#010a01" }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl tracking-widest uppercase" style={{ color: "#00ff41" }}>
          ⬡ STRESS.SYS
        </h1>
        <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "#0a3a0a" }}>
          Web Load Testing Terminal — v2.0
        </p>
      </div>

      <div className="flex gap-4 flex-1" style={{ height: "calc(100vh - 120px)" }}>
        {/* Left Panel */}
        <div className="w-72 shrink-0">
          <TestForm
            setMetrics={setMetrics}
            setIsRunning={setIsRunning}
            setIsComplete={setIsComplete}
            isRunning={isRunning}
            isComplete={isComplete}
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 overflow-y-auto">
          {metrics.length === 0 && !isRunning ? (
            <div
              className="h-full flex items-center justify-center rounded-lg"
              style={{ border: "1px dashed #00ff4122" }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: "#0a3a0a" }}>
                ▸ Awaiting load test initiation...
              </p>
            </div>
          ) : (
            <Dashboard
              metrics={metrics}
              isRunning={isRunning}
              isComplete={isComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
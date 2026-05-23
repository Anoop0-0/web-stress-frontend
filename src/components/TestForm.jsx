import { useState, useEffect } from "react";
import socket from "../socket";

function TestForm({ setMetrics, setIsRunning, setIsComplete, isRunning, isComplete }) {
  const [url, setUrl] = useState("https://example.com");
  const [users, setUsers] = useState(300);

  useEffect(() => {
    const handleMetrics = (data) => setMetrics((prev) => [...prev, data]);
    const handleComplete = () => { setIsRunning(false); setIsComplete(true); };
    const handleError = (err) => { console.error(err.message); setIsRunning(false); };

    socket.on("metrics", handleMetrics);
    socket.on("test-complete", handleComplete);
    socket.on("test-error", handleError);

    return () => {
      socket.off("metrics", handleMetrics);
      socket.off("test-complete", handleComplete);
      socket.off("test-error", handleError);
    };
  }, []);

  const startTest = () => {
    setMetrics([]);
    setIsComplete(false);
    setIsRunning(true);
    socket.emit("start-test", { url, users });
  };

  return (
    <div className="h-full rounded-lg p-4 relative flex flex-col"
      style={{ background: "#020d02", border: "1px solid #00ff4122" }}>

      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-2 h-2" style={{ borderTop: "1px solid #00ff41", borderLeft: "1px solid #00ff41" }}/>
      <span className="absolute top-0 right-0 w-2 h-2" style={{ borderTop: "1px solid #00ff41", borderRight: "1px solid #00ff41" }}/>
      <span className="absolute bottom-0 left-0 w-2 h-2" style={{ borderBottom: "1px solid #00ff41", borderLeft: "1px solid #00ff41" }}/>
      <span className="absolute bottom-0 right-0 w-2 h-2" style={{ borderBottom: "1px solid #00ff41", borderRight: "1px solid #00ff41" }}/>

      <div className="mb-5">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#0a3a0a" }}>▸ Target Endpoint</p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded px-3 py-2 text-xs outline-none"
          style={{ background: "#010a01", border: "1px solid #00ff4133", color: "#00ff41" }}
          placeholder="https://example.com"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#0a3a0a" }}>▸ Concurrent Users</p>
        <p className="text-sm mb-2" style={{ color: "#00ff41" }}>{users.toLocaleString()}</p>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: "#0a3a0a" }}>
          <span>100</span><span>10,000</span>
        </div>
      </div>

      <button
        onClick={startTest}
        disabled={isRunning}
        className="w-full py-3 text-xs tracking-widest uppercase rounded transition"
        style={{
          background: "transparent",
          border: "1px solid #00ff41",
          color: isRunning ? "#0a3a0a" : "#00ff41",
          cursor: isRunning ? "not-allowed" : "pointer"
        }}
      >
        {isRunning ? "[ RUNNING... ]" : "[ INITIATE LOAD TEST ]"}
      </button>

      {/* Status info */}
      <div className="mt-6 pt-4 flex-1" style={{ borderTop: "1px solid #00ff4111" }}>
        <div className="text-xs leading-loose" style={{ color: "#0a3a0a" }}>
          <div>▸ TARGET &nbsp;&nbsp; {new URL(url).hostname}</div>
          <div>▸ USERS &nbsp;&nbsp;&nbsp; {users.toLocaleString()}</div>
          <div>▸ BATCHES &nbsp; {Math.ceil(users / 100)} × 100</div>
          <div>▸ TIMEOUT &nbsp; 10,000ms</div>
        </div>
      </div>

      {isRunning && (
        <div className="mt-4 text-xs tracking-widest uppercase" style={{ color: "#00ff41" }}>
          <span className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }}/>
          RUNNING...
        </div>
      )}

      {isComplete && (
        <div className="mt-4 text-xs tracking-widest uppercase" style={{ color: "#00ff41" }}>
          ✓ TEST COMPLETE
        </div>
      )}
    </div>
  );
}

export default TestForm;
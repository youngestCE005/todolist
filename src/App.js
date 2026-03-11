import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    category: "Clean Bee",
    emoji: "🐝",
    color: "#f5c518",
    tasks: [
      { id: 11, text: "Open fresh Gmail on Ramaki's phone (not business email)", done: false },
      { id: 12, text: "Create new GBP listing under that account", done: false },
      { id: 13, text: "Use different address (commercial or friend's)", done: false },
      { id: 14, text: "Update address on housecleaningmontreal.site to match", done: false },
      { id: 15, text: "Attempt instant verify — abort if video required", done: false },
    ]
  },
  {
    id: 2,
    category: "Review Stand",
    emoji: "⭐",
    color: "#3b82f6",
    tasks: [
      { id: 21, text: "Pick weekend date + campus location", done: false },
      { id: 22, text: "Buy Red Bulls", done: false },
      { id: 23, text: "Print QR codes for each GBP review link", done: false },
      { id: 24, text: "Brief whoever is running the stand", done: false },
    ]
  },
  {
    id: 3,
    category: "CleanMaxx Ads",
    emoji: "🚗",
    color: "#22c55e",
    tasks: [
      { id: 31, text: "Create CleanMaxx Facebook page", done: false },
      { id: 32, text: "Write end-of-winter ad copy (salt/mats/pre-spring angle)", done: false },
      { id: 33, text: "Make creative — before/after or video", done: false },
      { id: 34, text: "Set up Facebook ad campaign targeting MTL", done: false },
    ]
  }
];

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (catId, taskId) => {
    setTasks(tasks.map(cat =>
      cat.id === catId
        ? { ...cat, tasks: cat.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
        : cat
    ));
  };

  const totalDone = tasks.flatMap(c => c.tasks).filter(t => t.done).length;
  const totalAll = tasks.flatMap(c => c.tasks).length;
  const pct = Math.round((totalDone / totalAll) * 100);

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      maxWidth: 460,
      margin: "0 auto",
      padding: "28px 20px",
      background: "#0f0f0f",
      minHeight: "100vh",
      color: "#fff"
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 6 }}>Operations</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 400, letterSpacing: -1 }}>Today's Tasks</h1>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: pct === 100 ? "#22c55e" : "#fff" }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "#555" }}>{totalDone}/{totalAll} done</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 16, height: 2, background: "#222", borderRadius: 2 }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: pct === 100 ? "#22c55e" : "#f5c518",
            borderRadius: 2,
            transition: "width 0.4s ease"
          }} />
        </div>
      </div>

      {/* Categories */}
      {tasks.map(cat => {
        const catDone = cat.tasks.filter(t => t.done).length;
        const allDone = catDone === cat.tasks.length;
        return (
          <div key={cat.id} style={{
            marginBottom: 20,
            border: `1px solid ${allDone ? cat.color + "44" : "#1e1e1e"}`,
            borderLeft: `3px solid ${allDone ? cat.color : "#2a2a2a"}`,
            borderRadius: 10,
            padding: "14px 16px",
            background: "#141414",
            transition: "border-color 0.3s"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: 0.3 }}>{cat.category}</span>
              </div>
              <span style={{
                fontSize: 11,
                color: allDone ? cat.color : "#444",
                fontFamily: "monospace"
              }}>{catDone}/{cat.tasks.length}</span>
            </div>

            {cat.tasks.map((task, i) => (
              <div key={task.id}
                onClick={() => toggle(cat.id, task.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "9px 0",
                  borderTop: i === 0 ? "none" : "1px solid #1c1c1c",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}>
                <div style={{
                  width: 18,
                  height: 18,
                  marginTop: 1,
                  borderRadius: 5,
                  border: `2px solid ${task.done ? cat.color : "#333"}`,
                  background: task.done ? cat.color : "transparent",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}>
                  {task.done && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: task.done ? "#333" : "#ccc",
                  textDecoration: task.done ? "line-through" : "none",
                  transition: "color 0.2s"
                }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        );
      })}

      {totalDone === totalAll && (
        <div style={{ textAlign: "center", marginTop: 24, color: "#22c55e", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
          All done. Let's get it.
        </div>
      )}
    </div>
  );
}
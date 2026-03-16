import Link from "next/link"

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>

      <h1>Smart Scheduler</h1>

      <p>
        Schedule your tasks based on your natural energy levels
        and prevent burnout.
      </p>

      <Link href="/tasks">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Start Planning
        </button>
      </Link>

      <hr style={{ margin: "40px 0" }} />

      <h2>Features</h2>

      <ul>
        <li>⚡ Energy-based task scheduling</li>
        <li>🧠 Chronotype analysis</li>
        <li>📅 Smart calendar planner</li>
        <li>☕ Automatic break suggestions</li>
      </ul>

    </main>
  )
}
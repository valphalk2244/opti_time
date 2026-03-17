import Link from "next/link"

export default function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderBottom: "1px solid #ddd",
            }}
        >
            <Link href="/">
                <strong>Smart Scheduler</strong>
            </Link>

            <div style={{ display: "flex", gap: "20px" }}>
                <Link href="/">Home</Link>
                <Link href="/tasks">Tasks</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <Link href="/calendar">Calendar</Link>
            </div>
        </nav>
    )
}
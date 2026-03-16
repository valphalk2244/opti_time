"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Task = {
  id: string
  title: string
  difficulty: string
  estimated_duration: number
}

export default function TasksPage() {

  const [title, setTitle] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [duration, setDuration] = useState(60)

  const [tasks, setTasks] = useState<Task[]>([])

  const loadTasks = async () => {

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) return

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)

    setTasks(data || [])

  }

  const addTask = async () => {

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      alert("Please login first")
      return
    }

    await supabase.from("tasks").insert({
      user_id: user.id,
      title: title,
      difficulty: difficulty,
      estimated_duration: duration
    })

    setTitle("")
    loadTasks()

  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div style={{ padding: "40px" }}>

      <h1>Tasks</h1>

      <h3>Add Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <br /><br />

      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />

      <br /><br />

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTask}>
        Add Task
      </button>

      <hr />

      <h3>Your Tasks</h3>

      {tasks.map(task => (
        <div key={task.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <strong>{task.title}</strong>
          <p>Difficulty: {task.difficulty}</p>
          <p>Duration: {task.estimated_duration} min</p>
        </div>
      ))}

    </div>
  )
}
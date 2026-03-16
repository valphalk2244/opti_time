export type Task = {
    id?: string
    user_id?: string
    title: string
    difficulty: "low" | "medium" | "high"
    estimated_duration: number
    created_at?: string
}
type Task = {
    id: string
    difficulty: "low" | "medium" | "high"
    estimated_duration: number
}

type Schedule = {
    task_id: string | null
    start_time: Date
    end_time: Date
    type: "task" | "break"
}

export function generateSchedule(tasks: Task[]): Schedule[] {

    const schedules: Schedule[] = []

    let startTime = new Date()
    startTime.setHours(9, 0, 0)

    let workMinutes = 0

    for (const task of tasks) {

        if (workMinutes >= 120) {

            const breakStart = new Date(startTime)
            const breakEnd = new Date(startTime)

            breakEnd.setMinutes(breakEnd.getMinutes() + 10)

            schedules.push({
                task_id: null,
                start_time: breakStart,
                end_time: breakEnd,
                type: "break"
            })

            startTime = breakEnd
            workMinutes = 0
        }

        const start = new Date(startTime)

        const end = new Date(start)
        end.setMinutes(start.getMinutes() + task.estimated_duration)

        schedules.push({
            task_id: task.id,
            start_time: start,
            end_time: end,
            type: "task"
        })

        startTime = end
        workMinutes += task.estimated_duration
    }

    return schedules
}
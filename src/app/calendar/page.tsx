"use client"

import { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { supabase } from "@/lib/supabase"

const locales = {
    "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

type CalendarEvent = {
    title: string
    start: Date
    end: Date
}

export default function CalendarPage() {

    const [events, setEvents] = useState<CalendarEvent[]>([])

    const loadSchedules = async () => {

        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) return

        const { data } = await supabase
            .from("schedules")
            .select(`
        start_time,
        end_time,
        tasks(title)
      `)
            .eq("user_id", user.id)

        if (!data) return

        const calendarEvents = data.map((item: any) => ({
            title: item.type === "break"
                ? "Break ☕"
                : item.tasks.title,
            start: new Date(item.start_time),
            end: new Date(item.end_time),
        }))

        setEvents(calendarEvents)
    }

    useEffect(() => {
        loadSchedules()
    }, [])

    return (
        <div style={{ height: "80vh", padding: "40px" }}>

            <h1>Calendar</h1>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />

        </div>
    )
}
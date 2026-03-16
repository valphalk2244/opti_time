import { supabase } from "@/lib/supabase"

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

function setTasks(arg0: any[]) {
    throw new Error("Function not implemented.")
}

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async () => {

        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            alert(error.message)
        } else {
            alert("Check your email to confirm account")
        }

    }

    return (
        <div style={{ padding: "40px" }}>

            <h1>Register</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={register}>
                Register
            </button>

        </div>
    )
}
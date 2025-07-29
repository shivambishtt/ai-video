"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        if (result?.error) {
            console.log(result.error);
        }
        else {
            router.push("/")
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            <div>
                <h1>Does not have an account?</h1>
                <button onClick={() => router.push("/register")}>Register</button>
            </div>
        </div>
    )
}

export default LoginPage

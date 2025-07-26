"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Password does not match")
            return
        }
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Registration failed")
            }
            console.log(data)
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input type="password"
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button type='submit'>Register</button>
            </form>
            <div>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    )
}

export default RegisterPage

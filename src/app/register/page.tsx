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
        } catch (error) {

        }
    }
    return (
        <div>
            Register
        </div>
    )
}

export default RegisterPage

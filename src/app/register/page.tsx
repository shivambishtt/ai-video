"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router= useRouter()
    return (
        <div>
            Register
        </div>
    )
}

export default RegisterPage

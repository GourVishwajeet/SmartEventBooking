import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useApi"

export default function Login(){
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login}=useAuth()
  const nav=useNavigate()

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const ok=await login(email,password)
    if(ok) nav("/")
    else alert("Login failed")
  }

  return <form onSubmit={submit}>
    <h2>Login</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
    <input value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
    <button type="submit">Login</button>
  </form>
}

import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useApi"

export default function Register(){
  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const {register}=useAuth()
  const nav=useNavigate()

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const ok=await register(email,name,password)
    if(ok){alert("Registered");nav("/login")}
    else alert("Failed")
  }

  return <form onSubmit={submit}>
    <h2>Register</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
    <input value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
    <button type="submit">Register</button>
  </form>
}

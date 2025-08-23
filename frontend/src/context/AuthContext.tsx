import { createContext, useState, useEffect, type ReactNode } from "react"
import api, { setAuthToken } from "../api"

type User = { id:number; email:string; name:string; role:"USER"|"ADMIN" }
type AuthContextType = {
  user?: User
  token?: string
  login: (email:string,password:string)=>Promise<boolean>
  register: (email:string,name:string,password:string)=>Promise<boolean>
  logout: ()=>void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}:{children:ReactNode})=>{
  const [user,setUser]=useState<User>()
  const [token,setToken]=useState<string>()

  useEffect(()=>{
    const t=localStorage.getItem("token")
    const u=localStorage.getItem("user")
    if(t&&u){setToken(t);setUser(JSON.parse(u));setAuthToken(t)}
  },[])

  const login=async(email:string,password:string)=>{
    try{
      const {data}=await api.post("/auth/login",{email,password})
      setToken(data.token); setUser(data.user)
      localStorage.setItem("token",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      setAuthToken(data.token)
      return true
    }catch{return false}
  }

  const register=async(email:string,name:string,password:string)=>{
    try{
      await api.post("/auth/register",{email,name,password})
      return true
    }catch{return false}
  }

  const logout=()=>{
    setToken(undefined);setUser(undefined)
    localStorage.clear()
    setAuthToken(undefined)
  }

  return (
    <AuthContext.Provider value={{user,token,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

import { useEffect,useState } from "react"

import api from "../api";
import { useAuth } from "../hooks/useApi";

type Event={id:number;title:string;description:string;date:string;location:string;price:number;remaining:number}

export default function Events(){
  const [events,setEvents]=useState<Event[]>([])
  const {user}=useAuth()

  useEffect(()=>{
    api.get("/events").then(r=>
      setEvents(r.data))
  },[])

  const book=async(id:number)=>{
    try{
      await api.post("/bookings",{eventId:id,quantity:1})
      alert("Booked")
    }catch{alert("Error")}
  }

  return <div>
    <h2>Events</h2>
    {
      events.length>0?(<>
       {events?.map(e=>
      <div key={e.id} style={{border:"1px solid #ccc",margin:10,padding:10}}>
        <h3>{e.title}</h3>
        <p>{e.description}</p>
        <p>{new Date(e.date).toLocaleString()} at {e.location}</p>
        <p>₹{e.price} | Remaining: {e.remaining}</p>
        {user && e.remaining>0 && <button onClick={()=>book(e.id)}>Book</button>}
      </div>
    )}
      </>):(<></>)
    }
   
  </div>
}

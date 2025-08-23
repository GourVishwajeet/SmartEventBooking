import { useEffect,useState } from "react"
import api from "../api";


type Booking={id:number;quantity:number;createdAt:string;title:string;date:string;location:string;price:number}

export default function MyBookings(){
  const [bookings,setBookings]=useState<Booking[]>([])

  useEffect(()=>{
    api.get("/bookings/me").then(r=>setBookings(r.data))
  },[])

  const cancel=async(eventId:number)=>{
    await api.delete("/bookings/"+eventId)
    setBookings(b=>b.filter(x=>x.id!==eventId))
  }

  return <div>
    <h2>My Bookings</h2>
    {bookings.map(b=>
      <div key={b.id}>
        <p>{b.title} - {b.quantity} ticket(s)</p>
        <button onClick={()=>cancel(b.id)}>Cancel</button>
      </div>
    )}
  </div>
}

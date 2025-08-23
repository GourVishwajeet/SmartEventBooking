import { Armchair, BadgeIndianRupee, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Navigate, useNavigate } from "react-router-dom"

interface Event {
  available_seats: number
  date: string
  description: string
  id: number
  img: string
  location: string
  price: number
  title: string
  total_seats: number
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const remaining = Math.max(
    Number(event.available_seats ?? 0),
    0
  )
  const total = Math.max(Number(event.total_seats ?? 0), 0)
  const used = Math.max(total - remaining, 0)
  const pct = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0

  const navigate = useNavigate()
  const handleClick =(id:number)=>{
    navigate(`/event_details/${id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden border border-gray-100"
    >
      {typeof event.img === "string" && event.img ? (
        <img
          className="h-44 w-full object-cover"
          src={
            event.img.startsWith("http")
              ? event.img
              : `${import.meta.env.VITE_API_URL}${event.img}`
          }
          alt={event.title}
        />
      ) : (
        <div className="h-44 w-full bg-gray-100 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-semibold text-lg text-black line-clamp-2">{event.title}</h4>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 px-2 py-1 text-xs font-medium">
            <Armchair className="h-3.5 w-3.5" />
            {remaining} left
          </span>
        </div>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-3 space-y-1.5 text-sm text-gray-700">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleString()}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center font-semibold">
            <BadgeIndianRupee className="h-4 w-4 mr-1" />
            {event.price.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600"
              style={{ width: `${pct}%` }}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {used}/{total} booked
          </div>
        </div>

        <button onClick={()=>handleClick(event.id)} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
          Book Now
        </button>
      </div>
    </motion.div>
  )
}

export default EventCard

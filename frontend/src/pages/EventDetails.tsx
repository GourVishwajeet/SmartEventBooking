import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Calendar, MapPin, BadgeIndianRupee, Users } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  location: string
  date: string
  img: string
  price: number
  total_seats: number
  available_seats: number
}

const ticketCategories = [
  { type: "Regular", multiplier: 1 },
  { type: "VIP", multiplier: 1.5 },
  { type: "Premium", multiplier: 2 },
]

const EventDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(ticketCategories[0])
  const [quantity, setQuantity] = useState(1)
  const [ticketCategory,setTicketCategory] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((res) => {
        setEvent({ ...res.data, price: Number(res.data.price) })
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [id])

  if (loading) return <p className="p-6">Loading...</p>
  if (!event) return <p className="p-6">Event not found</p>

  const totalPrice = (
    event.price *
    selectedCategory.multiplier *
    quantity
  ).toFixed(2)

  

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Hero Image */}    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[400px] overflow-hidden"
      >
        {event.img ? (
          <img
            src={event.img.startsWith("http") ? event.img : `${import.meta.env.VITE_API_URL}${event.img}`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl md:text-5xl font-bold text-center"
          >
            {event.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 p-6 mt-6">
        {/* Left: Event Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <h2 className="text-2xl text-black     font-bold mb-4">{event.title}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              {new Date(event.date).toLocaleString()}
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Seats: {event.available_seats}/{event.total_seats}
            </div>
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <iframe
              title="map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
              className="rounded-lg shadow-md"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* Right: Booking Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 h-fit"
        >
          <h3 className="text-xl text-black font-semibold mb-4">Book Your Tickets</h3>

          {/* Ticket Categories */}
          <div className="flex gap-3 mb-6">
            {ticketCategories.map((cat) => {
           
              return(
              <motion.button
                key={cat.type}
                whileTap={{ scale: 0.95 }}
                onClick={() =>{setSelectedCategory(cat);setTicketCategory(cat.type)}}
                className={`px-4 py-2 rounded-lg border transition  ${
                  selectedCategory.type === cat.type
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {cat.type}
                
              </motion.button>
          )})}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center text-black gap-3 mb-6">
            <label className="font-medium ">Quantity:</label>
            <input
              type="number"
              min="1"
              max={event.available_seats}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded-lg text-white"
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-6 text-lg font-bold text-indigo-600">
            <BadgeIndianRupee className="h-5 w-5" />
            {totalPrice}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition"
            onClick={()=>navigate('/booking',{state:{quantity,totalPrice,ticketCategory,event}})}
          >
            Confirm Booking
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default EventDetails

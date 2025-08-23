import { useEffect, useMemo, useState } from "react"
import axios from "axios"

import { motion, AnimatePresence } from "framer-motion"
import EventCard from "./EventCards"

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

interface EventsListProps {
  query: string
}

const EventsList: React.FC<EventsListProps> = ({ query }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [locFilter, setLocFilter] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:4000/api/events")
        if (!mounted) return
        const data = (res.data || []).map((e: Event) => ({
          ...e,
          price: Number(e.price),
        }))
        setEvents(data)
      } catch (e: any) {
        setError("Failed to load events")
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const locations = useMemo(() => {
    const set = new Set(events.map((e) => e.location).filter(Boolean))
    return Array.from(set).sort()
  }, [events])

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      const byTitle = e.title && e.title.toLowerCase().includes(q)
      const byLocation = !locFilter || e.location === locFilter
      const t = new Date(e.date).getTime()
      const byFrom = !fromDate || t >= new Date(fromDate).getTime()
      const byTo = !toDate || t <= new Date(toDate).getTime()
      return byTitle && byLocation && byFrom && byTo
    })
  }, [events, query, locFilter, fromDate, toDate])

  return (
    <section className="max-w-6xl mx-auto p-6 ">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
        <h3 className="text-2xl text-gray-600 font-semibold">Upcoming Events</h3>
    
        <div className="grid text-gray-600 grid-cols-1 md:grid-cols-3 gap-3 w-full md:w-auto">
                       <div className="grid grid-flow-row">
        <label className="text-sm" htmlFor="">Filter By</label>
          <select
            value={locFilter}
            onChange={(e) => setLocFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          </div>
        <div className="grid grid-flow-row">
        <label className="text-sm" htmlFor="">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
            placeholder="From"
          />
        </div>
           <div className="grid grid-flow-row">
        <label className="text-sm" htmlFor="">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
            placeholder="To"
          />
        </div>
        </div>
      </div>

      {loading && <p className="text-gray-600">Loading events…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredEvents.length === 0 && (
        <div className="text-gray-600 bg-gray-50 border rounded-xl p-8 text-center">
          No events match your filters.
        </div>
      )}

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={false}
      >
        <AnimatePresence>
          {filteredEvents.map((e) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <EventCard event={e} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default EventsList

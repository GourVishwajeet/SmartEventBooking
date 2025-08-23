import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b w-screen from-indigo-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Discover & Book <span className="text-indigo-600">Amazing Events</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg text-gray-600"
        >
          Join thousands of people discovering live concerts, workshops, and
          experiences near you. Book your seat instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="/events"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 flex items-center gap-2"
          >
            Explore Events <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            How it Works
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white" id="how-it-works">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl shadow-lg"
            >
              <Calendar className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Discover Events</h3>
              <p className="text-gray-600">
                Explore concerts, workshops, and activities tailored to your
                interests.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl shadow-lg"
            >
              <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Find Nearby</h3>
              <p className="text-gray-600">
                Search by city and discover events happening near you.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl shadow-lg"
            >
              <Ticket className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book tickets in seconds with instant confirmation & QR codes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Ready to Join the Next Event?
        </motion.h2>
        <Link
          to="/events"
          className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Browse Events
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-50">
        © {new Date().getFullYear()} SmartEventBooking. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage

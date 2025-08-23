import { motion } from "framer-motion"
import { Users, Target, Award, Rocket } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen w-screen w-full bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-700"
        >
          About <span className="text-purple-600">Smart Event Booking</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
        >
          We simplify event booking by providing a seamless, modern, and secure
          way to attend your favorite events. From concerts to workshops, we’ve
          got you covered.
        </motion.p>
      </section>

      {/* Mission / Vision */}
      <section className="grid md:grid-cols-2 gap-8 px-6 max-w-6xl mx-auto mb-16">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <Target className="h-10 w-10 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To make booking events easy, accessible, and exciting for everyone.
            We aim to connect people with experiences that inspire, educate, and
            entertain.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <Rocket className="h-10 w-10 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            A world where attending events is just a click away — bridging the
            gap between organizers and attendees with technology and trust.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="h-8 w-8 text-indigo-600" />,
              title: "Community First",
              desc: "We believe in building strong communities through events.",
            },
            {
              icon: <Award className="h-8 w-8 text-purple-600" />,
              title: "Excellence",
              desc: "Delivering the best event experiences with top-notch service.",
            },
            {
              icon: <Rocket className="h-8 w-8 text-indigo-500" />,
              title: "Innovation",
              desc: "Constantly improving and bringing fresh ideas to event booking.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-indigo-700 text-white text-center py-6">
        <p>
          © {new Date().getFullYear()} Smart Event Booking. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import confetti from "canvas-confetti";
import { useLocation } from "react-router-dom";
import { Calendar, MapPin, Ticket, BadgeIndianRupee } from "lucide-react";
import api from "../api";

export default function BookingFlow() {
  const location = useLocation();
  const { quantity, totalPrice, ticketCategory, event } = location.state || {};

  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [tickets, setTickets] = useState(1);
  const [totalAmount, setTotalAmount] = useState(totalPrice);
  const [error, setError] = useState('');

  useEffect(() => {
    if (quantity) setTickets(quantity);
    if (totalPrice) setTotalAmount(totalPrice);
  }, [quantity]);
  const formatDateForMySQL = (date: Date) => {
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = formatDateForMySQL(new Date());
    const bookingData = {
      eventId: event.id,
      name,
      email,
      mobile,
      quantity: tickets,
      total_amount: totalAmount,
      booking_date: date,
      status: "confirmed",
    };

    try {
      await api.post("/bookings/", bookingData, {
        headers: { "Content-Type": "application/json" },
      });
      setStep("success");
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    } catch (error) {
      console.log(error);
      setStep("failure");
      setError(error.response.data.error)
    }
  };

  const ticketData = JSON.stringify({
    name,
    email,
    event: event?.title,
    category: ticketCategory?.type,
    tickets,
    totalAmount,
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form
              key="form"
              onSubmit={handleBooking}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Checkout
              </h2>

              {/* Event Summary */}
              {event && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Ticket className="h-4 w-4 mr-2" />
                    {ticketCategory?.type} × {tickets}
                  </div>
                  <div className="flex items-center text-indigo-600 font-semibold mt-2 text-lg">
                    <BadgeIndianRupee className="h-5 w-5 mr-1" />
                    {tickets * event.price}
                  </div>
                </div>
              )}

              {/* Inputs */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Tickets
                </label>
                <input
                  type="number"
                  min={1}
                  value={tickets}
                  onChange={(e) => {
                    setTickets(Number(e.target.value));
                    setTotalAmount(Number(e.target.value) * event.price);
                  }}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
              >
                Confirm Booking
              </motion.button>
            </motion.form>
          )}
          {step === "success" && (
            //  success screen
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you{" "}
                <span className="font-semibold text-gray-800">{name}</span>!
                Your <b>{ticketCategory?.type}</b> ticket(s) for{" "}
                <b>{event?.title}</b> are booked.
              </p>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <QRCodeCanvas value={ticketData} size={200} />
              </div>

              {/* Download QR */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const canvas = document.querySelector(
                    "canvas"
                  ) as HTMLCanvasElement;
                  const link = document.createElement("a");
                  link.download = "ticket-qr.png";
                  link.href = canvas.toDataURL("image/png");
                  link.click();
                }}
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 cursor-pointer"
              >
                Download Ticket
              </motion.a>
            </motion.div>
          )}

          {step === "failure" && (
            // failure screen

            <motion.div
              key="failure"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                ❌ Booking Failed!
              </h2>
               <h6 className="text-xl font-bold text-red-600 mb-4">
                {error}
              </h6>
              <p className="text-gray-600 mb-6">
                Sorry{" "}
                <span className="font-semibold text-gray-800">
                  {name || "User"}
                </span>
                , we couldn’t complete your booking for <b>{event?.title}</b>.
                Please try again or contact support.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 cursor-pointer"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

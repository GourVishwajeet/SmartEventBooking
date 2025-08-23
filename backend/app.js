import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import eventRoutes from "./src/routes/eventRoutes.js"
import { createServer } from "http";
import bookingRoutes from "./src/routes/bookingRoutes.js"
import { Server } from "socket.io";

dotenv.config()
const app = express()
const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: ["http://localhost:5173","https://smart-event-booking-dm2h4fw7q-gourvishwajeets-projects.vercel.app","https://smart-event-booking-nine.vercel.app/","https://smart-event-booking-git-main-gourvishwajeets-projects.vercel.app/"] }, // frontend origin
});

app.use(cors({
  origin: [
    "http://localhost:5173",            
    "https://smart-event-booking-nine.vercel.app" ,
    "https://smart-event-booking-dm2h4fw7q-gourvishwajeets-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json())
app.use("/uploads", express.static("uploads"));

// app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/bookings",bookingRoutes)


export default app

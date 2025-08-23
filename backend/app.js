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
  cors: { origin: "http://localhost:5173" }, // frontend origin
});

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())
app.use("/uploads", express.static("uploads"));

// app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/bookings",bookingRoutes)


export default app

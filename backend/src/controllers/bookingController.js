import { db } from "../configs/db.js"
import { io } from "../../app.js";

export const getBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await db.query(
      `SELECT 
         b.id,
         b.quantity,
         b.createdAt,
         e.id AS eventId,
         e.title,
         e.date,
         e.location,
         e.price
       FROM bookings b
       JOIN events e ON b.eventId = e.id
       WHERE b.userId = ?
       ORDER BY b.createdAt DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// bookingController.js
export const createBooking = async (req, res) => {
  try {
    const {
      eventId,
      quantity,
      name,
      email,
      mobile,
      total_amount,
      booking_date,
      status,
    } = req.body;


    const [rows] = await db.query("SELECT * FROM events WHERE id=?", [eventId]);
    if (!rows.length) return res.status(404).json({ error: "Event not found" });

    const event = rows[0];


    if (event.available_seats < quantity) {
      return res.status(400).json({
        error: `Only ${event.available_seats} seats left`,
      });
    }

    
    await db.query(
      "INSERT INTO bookings (event_id, name, email, mobile, quantity, total_amount, booking_date, status) VALUES (?,?,?,?,?,?,?,?)",
      [
        eventId,
        name,
        email,
        mobile,
        quantity,
        total_amount,
        booking_date, 
        status,
      ]
    );

   
    await db.query(
      "UPDATE events SET available_seats = available_seats - ? WHERE id=?",
      [quantity, eventId]
    );

    
    const [updated] = await db.query("SELECT * FROM events WHERE id=?", [
      eventId,
    ]);

 
    io.emit("seatUpdate", {
      eventId,
      available_seats: updated[0].available_seats,
    });

    res.json({ success: true, event: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
};

export const deleteBooking = async(req,res)=>{
  await db.query("DELETE FROM bookings WHERE userId=? AND eventId=?",[req.user.id,req.params.eventId])
  res.json({ok:true})
}



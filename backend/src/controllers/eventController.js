
import { db } from "../configs/db.js"



export const getAllEvents = async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM events");
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [events] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(events[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};


export const createEvent = async(req,res)=>{
  const {title,description,location,date,price,total_seats,available_seats}=req.body
  const img = req.file ? `/uploads/${req.file.filename}` : null;
  const [result]=await db.query(
    "INSERT INTO events (title,description,location,date,total_seats,available_seats,price,img) VALUES (?,?,?,?,?,?,?,?)",
    [title,description,location,new Date(date),total_seats,available_seats,price||0,img])
  res.json({id:result.insertId})
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, date, price, total_seats, available_seats } = req.body;

    
    // get current event first
    const [currentRows] = await db.query("SELECT * FROM events WHERE id=?", [id]);
    if (currentRows.length === 0) return res.status(404).json({ error: "Event not found" });
    const current = currentRows[0];

    const img = req.file ? `/uploads/${req.file.filename}` : current.img; 

    await db.query(
      `UPDATE events 
       SET title=?, description=?, location=?, date=?, price=?, total_seats=?, available_seats=?, img=? 
       WHERE id=?`,
      [
        title || current.title,
        description || current.description,
        location || current.location,
        date ? new Date(date) : current.date,
        price !== undefined ? price : current.price,
        total_seats !== undefined ? total_seats : current.total_seats,
        available_seats !== undefined ? available_seats : current.available_seats,
        img,
        id,
      ]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};



export const deleteEvent =async(req,res)=>{
  await db.query("DELETE FROM bookings WHERE id=?",[req.params.id])
  await db.query("DELETE FROM events WHERE id=?",[req.params.id])
  res.json({ok:true})
}



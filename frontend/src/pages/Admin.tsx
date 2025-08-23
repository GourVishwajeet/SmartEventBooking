import { useState, useEffect } from "react";
import api from "../api";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  total_seats: number | undefined;
  available_seats: number | undefined;
  price: number | undefined;
  img: string | File;
};

export default function Admin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null); 

  const [form, setForm] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: undefined,
    available_seats: undefined,
    price: undefined,
    img: "" as string | File,
  });

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create Event
  const create = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (form.img instanceof File) {
        formData.set("img", form.img);
      }

      await api.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        total_seats: 0,
        available_seats: 0,
        price: 0,
        img: "",
      });

      load();
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  // Delete Event
  const del = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await api.delete("/events/" + id);
    load();
  };


  const edit = (event: Event) => {
    setEditingEvent(event);
  };


const saveEdit = async () => {
  if (!editingEvent) return;
  try {
    const formData = new FormData();

    
    formData.append("title", editingEvent.title || "");
    formData.append("description", editingEvent.description || "");
    formData.append("location", editingEvent.location || "");
    formData.append("date", editingEvent.date || "");
    if (editingEvent.total_seats !== undefined)
      formData.append("total_seats", String(editingEvent.total_seats));
    if (editingEvent.available_seats !== undefined)
      formData.append("available_seats", String(editingEvent.available_seats));
    if (editingEvent.price !== undefined)
      formData.append("price", String(editingEvent.price));

    if (editingEvent.img instanceof File) {
     
      formData.append("img", editingEvent.img);
    } else if (typeof editingEvent.img === "string" && editingEvent.img) {
     
      formData.append("img", editingEvent.img);
    }

    await api.put(`/events/${editingEvent.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditingEvent(null);
    load();
  } catch (err) {
    console.error("Failed to update event", err);
  }
};


  const filteredEvents = events.filter((e) =>
    e.title && e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-950 min-h-screen w-screen  text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

      {/* Create Event Form */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Event Title"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
            placeholder="Price"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="number"
            value={form.total_seats}
            onChange={(e) =>
              setForm({ ...form, total_seats: parseInt(e.target.value) })
            }
            placeholder="Total Seats"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="number"
            value={form.available_seats}
            onChange={(e) =>
              setForm({ ...form, available_seats: parseInt(e.target.value) })
            }
            placeholder="Available Seats"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setForm({ ...form, img: e.target.files[0] });
              }
            }}
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white col-span-2"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white col-span-2"
          />
        </div>
        <button
          onClick={create}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
        >
          Create Event
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold">Events</h4>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
        />
      </div>

      {/* Event Cards */}
      {loading ? (
        <p className="text-gray-400">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-gray-400">No events found</p>
      ) : (
        <div className="grid md:grid-cols-2 w-fit lg:grid-cols-3 gap-6">
          {filteredEvents.map((e) => (
            <div
              key={e.id}
              className="bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col hover:shadow-xl transition"
            >
              {typeof e.img === "string" && e.img ? (
                <img
                  className="rounded-md max-w-96 max-h-52"
                  src={`http://localhost:4000${e.img}`}
                  alt={e.title}
                />
              ) : (
                <div className="rounded-md mb-3 h-40 w-full flex items-center justify-center bg-gray-700 text-gray-400">
                  No image available
                </div>
              )}
              <h5 className="text-lg font-bold">{e.title}</h5>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(e.date).toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">{e.location}</p>
              <p className="mt-2">{e.description}</p>
              <p className="text-green-400 font-semibold mt-2">
                ₹{Number(e.price).toFixed(2)}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Seats: {e.available_seats}/{e.total_seats}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => del(e.id)}
                  className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md text-sm font-semibold transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => edit(e)}
                  className="bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded-md text-sm font-semibold transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>
            <div className="grid gap-3">
              <input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              />
              <input
                type="datetime-local"
                value={
                  editingEvent.date
                    ? new Date(editingEvent.date).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              />
              <input
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              />
              <input
                type="number"
                value={editingEvent.price}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    price: parseFloat(e.target.value),
                  })
                }
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              />
              <div>
                {typeof editingEvent.img === "string" && editingEvent.img ? (
                  <img
                    src={`http://localhost:4000${editingEvent.img}`}
                    alt="Event Preview"
                    className="w-32 h-20 object-cover rounded mb-2"
                  />
                ) : editingEvent.img instanceof File ? (
                  <p className="text-sm text-gray-400 mb-2">
                    New image selected: {editingEvent.img.name}
                  </p>
                ) : null}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    setEditingEvent({ ...editingEvent, img: e.target.files[0] })
                  }
                  className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white w-full"
                />
              </div>
              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 bg-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

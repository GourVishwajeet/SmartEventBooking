import { useState } from "react";

import Hero from "../components/Hero";
import EventsList from "../components/EventList";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen w-screen overflow-x-hidden font-sans bg-gray-50">
      
      <Hero query={query} setQuery={setQuery} />
      <EventsList query={query} />
    </div>
  );
}

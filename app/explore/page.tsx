// app/explore/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExplorePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      
      {/* Hero Header */}
      <header className="py-20 px-8 text-center" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">Discover the Extraordinary</h1>
        <p className="text-[#dad7ff] text-xl max-w-2xl mx-auto">Browse upcoming tech meetups, conferences, and exclusive experiences.</p>
        <Link href="/dashboard" className="inline-block mt-8 px-6 py-3 bg-white text-[#3525cd] font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
          Go to Dashboard
        </Link>
      </header>

      {/* Event Grid */}
      <section className="max-w-6xl mx-auto p-8 md:p-12">
        {loading ? (
          <div className="text-center text-[#464555] font-bold text-xl py-20">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-[#464555] font-bold text-xl py-20">No events found. Be the first to host one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <article key={event.id} className="bg-white rounded-2xl shadow-sm border border-[#eceef0] overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image Placeholder */}
                <div className="h-48 bg-[#e2dfff] w-full flex items-center justify-center">
                  <span className="text-4xl">🎟️</span>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold line-clamp-1">{event.title}</h2>
                    <p className="text-[#3525cd] font-semibold text-sm mt-1">By {event.organizer?.organizationName || event.organizer?.fullName}</p>
                  </div>
                  
                  <div className="text-[#464555] text-sm space-y-2">
                    <p className="flex items-center gap-2">📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p className="flex items-center gap-2">📍 {event.location}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#eceef0] flex justify-between items-center">
                    <span className="font-extrabold text-xl">{event.price > 0 ? `$${event.price}` : "FREE"}</span>
                    <button className="px-5 py-2 bg-[#f2f4f6] text-[#191c1e] font-bold rounded-lg hover:bg-[#3525cd] hover:text-white transition-colors">
                      RSVP
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
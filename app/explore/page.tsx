// app/explore/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import toast from "react-hot-toast";

// Professional fallback images from Unsplash
const placeholderImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&auto=format&fit=crop&q=80"
];

export default function ExplorePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Technology", "Music", "Business", "Arts"];

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

  const handleRSVP = async (eventId: string) => {
    const toastId = toast.loading("Securing your ticket...");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Ticket booked successfully! 🎉 See you there.", { id: toastId });
      } else {
        toast.error("Error: " + data.error, { id: toastId });
      }
    } catch (err) {
      toast.error("Please log in to book a ticket.", { id: toastId });
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      const organizerName = event.organizer?.organizationName || event.organizer?.fullName || "";
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        organizerName.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower);
      return matchesSearch;
    });
  }, [events, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 flex-1">
        <div className="px-6 text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-4 tracking-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3525cd] to-[#4f46e5] italic">Extraordinary.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Browse live events, meetups, and exclusive experiences hosted by the TktMaster community.
          </p>
        </div>

        <section className="px-6 max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mx-auto mb-10">
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="pl-4 pr-1 flex items-center justify-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 py-3 px-2 outline-none" 
                placeholder="Search by title, location, or organizer..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> 
              <button className="bg-[#3525cd] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all active:scale-95">
                Search
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-8 border-b border-[#eceef0] pb-4">
            <div>
              <h2 className="text-3xl font-bold text-[#191c1e] tracking-tight">All Events</h2>
              <p className="text-slate-400 text-sm mt-1">{filteredEvents.length} events found</p>
            </div>
          </div>

          {loading ? (
            /* --- SKELETON LOADERS --- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                <div key={skeleton} className="bg-white rounded-3xl h-[380px] border border-[#eceef0] overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200 w-full"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                    <div className="h-10 bg-slate-200 rounded-xl w-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            /* --- REAL DATA GRID --- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <article key={event.id} className="bg-white rounded-3xl shadow-sm border border-[#eceef0] overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                    <img 
                      src={placeholderImages[index % placeholderImages.length]} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#191c1e] shadow-sm">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold line-clamp-1 mb-1 text-[#191c1e]">{event.title}</h2>
                    <p className="text-[#3525cd] font-semibold text-sm mb-4">
                      By {event.organizer?.organizationName || event.organizer?.fullName}
                    </p>
                    
                    <div className="text-[#464555] text-sm space-y-2 mb-6">
                      <p className="flex items-center gap-2">📍 {event.location}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-[#eceef0] mt-auto flex justify-between items-center">
                      <span className="font-extrabold text-xl text-[#191c1e]">{event.price > 0 ? `$${event.price}` : "FREE"}</span>
                      <button 
                        onClick={() => handleRSVP(event.id)}
                        className="px-6 py-2.5 bg-[#f2f4f6] text-[#191c1e] font-bold rounded-xl hover:bg-[#3525cd] hover:text-white transition-all active:scale-95"
                      >
                        RSVP
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* --- EMPTY STATE --- */
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No events found</h3>
              <p className="text-slate-500 mb-4">Try adjusting your search query.</p>
              <button onClick={() => setSearchQuery("")} className="text-[#3525cd] font-bold hover:underline">
                Clear search
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
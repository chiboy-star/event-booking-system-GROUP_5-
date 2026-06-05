// app/event/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import toast from "react-hot-toast";

export default function SingleEventPage() {
  const params = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setEvent(data.event);
        }
      } catch (err) {
        console.error("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.id]);

  const handleRSVP = async () => {
    setBooking(true);
    const toastId = toast.loading("Securing your ticket...");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Ticket secured successfully! 🎉", { id: toastId });
      } else {
        toast.error("Error: " + data.error, { id: toastId });
      }
    } catch (err) {
      toast.error("Please log in to book a ticket.", { id: toastId });
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans">
      <Navbar />

      <main className="pt-32 pb-24 flex-1 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-[#464555] font-semibold hover:text-[#3525cd] transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Events
          </button>

          {loading ? (
            /* --- PREMIUM SKELETON LOADER --- */
            <div className="bg-white rounded-3xl border border-[#eceef0] overflow-hidden shadow-sm animate-pulse">
              <div className="h-80 md:h-[400px] w-full bg-slate-200"></div>
              <div className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
                </div>
                <div className="h-24 bg-slate-200 rounded-2xl w-full"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-4/6"></div>
                </div>
              </div>
            </div>
          ) : !event ? (
            /* --- NOT FOUND STATE --- */
            <div className="text-center py-32 bg-white rounded-3xl border border-[#eceef0]">
              <h1 className="text-3xl font-bold text-[#191c1e] mb-2">Event Not Found</h1>
              <p className="text-[#464555]">This event may have been canceled or removed.</p>
            </div>
          ) : (
            /* --- REAL EVENT DETAILS --- */
            <div className="bg-white rounded-3xl border border-[#eceef0] overflow-hidden shadow-xl shadow-indigo-900/5">
              
              {/* Dynamic Hero Image */}
             
              <div className="relative h-80 md:h-[450px] w-full bg-slate-100">
                <img 
                  src={`https://picsum.photos/seed/${event.id}/1200/600`} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                  <span className="px-4 py-1.5 bg-[#3525cd] rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                    Featured
                  </span>
                </div>
              </div>
              

              <div className="p-8 md:p-12">
                {/* Title & Organizer */}
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-10 border-b border-[#eceef0] pb-10">
                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight mb-4 leading-tight">
                      {event.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#f2f4f6] flex items-center justify-center text-xl shadow-inner border border-slate-200">
                        {event.organizer?.organizationName?.charAt(0) || event.organizer?.fullName?.charAt(0) || "👤"}
                      </div>
                      <div>
                        <p className="text-sm text-[#464555] font-medium uppercase tracking-wider">Hosted by</p>
                        <p className="text-lg font-bold text-[#3525cd]">
                          {event.organizer?.organizationName || event.organizer?.fullName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Button Desktop */}
                  <div className="md:w-72 bg-[#f7f9fb] p-6 rounded-2xl border border-[#eceef0] flex flex-col justify-center">
                    <p className="text-sm text-[#464555] font-semibold mb-1 uppercase tracking-wider">Ticket Price</p>
                    <p className="text-4xl font-extrabold text-[#191c1e] mb-6">
                      {event.price > 0 ? `$${event.price}` : "Free"}
                    </p>
                    <button 
                      onClick={handleRSVP}
                      disabled={booking}
                      className="w-full py-4 bg-[#3525cd] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {booking ? (
                        <span className="animate-pulse">Securing Ticket...</span>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                          Book Now
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Event Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#e2dfff] text-[#3525cd] rounded-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#191c1e] text-lg mb-1">Date & Time</h4>
                      <p className="text-[#464555] font-medium text-lg">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-[#777587]">
                        {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#e2dfff] text-[#3525cd] rounded-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#191c1e] text-lg mb-1">Location</h4>
                      <p className="text-[#464555] font-medium text-lg">{event.location}</p>
                      <button className="text-[#3525cd] font-semibold hover:underline mt-1 text-sm">View Map</button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-[#191c1e] mb-4">About this Event</h3>
                  <div className="prose max-w-none text-[#464555] leading-loose text-lg">
                    <p>{event.description}</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
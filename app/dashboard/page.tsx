// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [eventData, setEventData] = useState({ title: "", date: "", location: "", price: "0", description: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (eventData.title.length < 5) return toast.error("Title must be at least 5 characters.");
    if (eventData.description.length < 10) return toast.error("Description is too short.");
    if (parseFloat(eventData.price) < 0) return toast.error("Price cannot be negative.");
    if (new Date(eventData.date) < new Date()) return toast.error("Event date must be in the future.");

    setCreating(true);
    const toastId = toast.loading("Publishing event...");
    
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...eventData, organizerId: user.id }),
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Event created successfully! 🎉", { id: toastId });
        setEventData({ title: "", date: "", location: "", price: "0", description: "" });
        setUser((prev: any) => ({
          ...prev,
          events: [...(prev.events || []), data.event]
        }));
      } else {
        toast.error(data.error || "Failed to create event.", { id: toastId });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setCreating(false);
    }
  };

  // Keep Navbar visible even while loading
  if (loading || !user) return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#e2dfff] border-t-[#3525cd] rounded-full animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans">
      <Navbar /> {/* <-- The Missing Navbar is back! */}

      <main className="pt-32 pb-20 flex-1 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-[#eceef0] pb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-[#191c1e] tracking-tight">Welcome, {user.fullName}</h1>
              <p className="text-[#464555] mt-2 text-lg">
                Logged in as <span className="font-bold text-[#3525cd] uppercase tracking-wider">{user.role}</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/explore" className="px-6 py-3 bg-white border border-[#eceef0] text-[#191c1e] rounded-xl font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
                Explore ↗
              </Link>
            </div>
          </header>

          {/* ORGANIZER VIEW */}
          {user.role === "organizer" && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#eceef0]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#e2dfff] text-[#3525cd] rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#191c1e]">Create a New Event</h2>
              </div>
              
              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#464555]">Event Title</label>
                    <input required type="text" value={eventData.title} onChange={(e) => setEventData({...eventData, title: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#464555]">Short Description</label>
                    <input required type="text" value={eventData.description} onChange={(e) => setEventData({...eventData, description: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#464555]">Date & Time</label>
                    <input required type="datetime-local" value={eventData.date} onChange={(e) => setEventData({...eventData, date: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#464555]">Location</label>
                    <input required type="text" value={eventData.location} onChange={(e) => setEventData({...eventData, location: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#464555]">Ticket Price ( ₦ )</label>
                    <input required type="number" min="0" step="0.01" value={eventData.price} onChange={(e) => setEventData({...eventData, price: e.target.value})} className="w-full md:w-1/2 px-4 py-3 bg-[#f2f4f6] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                  </div>
                </div>
                <button type="submit" disabled={creating} className="w-full md:w-auto px-10 py-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
                  {creating ? "Publishing Event..." : "Publish Event"}
                </button>
              </form>
            </section>
          )}

          {/* DYNAMIC DATA BINDING VIEW */}
          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#eceef0]">
            <h2 className="text-2xl font-bold text-[#191c1e] mb-8">
              {user.role === "organizer" ? "My Created Events" : "My Booked Tickets"}
            </h2>

            {user.events && user.events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.events.map((evt: any) => (
                  <Link href={`/event/${evt.id}`} key={evt.id}>
                    <div className="p-5 bg-[#f7f9fb] border border-[#eceef0] rounded-2xl flex justify-between items-center hover:border-[#3525cd] hover:shadow-md transition-all group cursor-pointer">
                      <div>
                        <h3 className="font-bold text-lg text-[#191c1e] group-hover:text-[#3525cd] transition-colors line-clamp-1">{evt.title}</h3>
                        <p className="text-sm text-[#464555] mt-1 flex items-center gap-1">📍 {evt.location}</p>
                      </div>
                      <span className="px-4 py-1.5 bg-[#e2dfff] text-[#3525cd] font-bold text-xs rounded-full shadow-sm">
                        {user.role === "organizer" ? "Live" : "Secured"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-[#eceef0] rounded-2xl bg-[#f7f9fb]">
                <p className="text-[#464555] text-lg font-medium mb-1">Nothing here yet.</p>
                <Link href="/explore" className="mt-4 px-8 py-3 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
                  {user.role === "organizer" ? "Browse Inspiration" : "Find an Event"}
                </Link>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
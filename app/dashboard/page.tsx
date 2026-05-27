// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Organizer Form State
  const [eventData, setEventData] = useState({ title: "", date: "", location: "", price: "0",description: "" });
  const [creating, setCreating] = useState(false);

  // 1. Fetch the user profile on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          router.push("/login"); // Not logged in? Kick them to login.
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // 2. Handle Event Creation (Organizers Only)
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...eventData, organizerId: user.id }),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Event created successfully! 🎉");
        setEventData({ title: "", date: "", location: "", price: "0" ,description: ""});
      }
    } catch (err) {
      alert("Failed to create event.");
    } finally {
      setCreating(false);
    }
  };

if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">Loading Pulse...</div>;
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#191c1e] p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b border-[#eceef0] pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {user.fullName}</h1>
            <p className="text-[#464555] mt-2 text-lg">
              Logged in as <span className="font-bold text-[#3525cd] uppercase">{user.role}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/explore" className="px-6 py-3 bg-white border border-[#eceef0] rounded-xl font-bold shadow-sm hover:shadow-md transition-all">
              Explore ↗
            </Link>
            <button 
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                router.push('/login');
              }}
              className="px-6 py-3 text-red-600 bg-red-50 font-bold rounded-xl hover:bg-red-100 transition-all"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* ORGANIZER VIEW */}
        {user.role === "organizer" && (
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#eceef0]">
            <h2 className="text-2xl font-bold mb-6">Create a New Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Event Title" value={eventData.title} onChange={(e) => setEventData({...eventData, title: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                
                <input required type="text" placeholder="Short Description" value={eventData.description} onChange={(e) => setEventData({...eventData, description: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                
                <input required type="datetime-local" value={eventData.date} onChange={(e) => setEventData({...eventData, date: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                <input required type="text" placeholder="Location (e.g., Lagos Hub)" value={eventData.location} onChange={(e) => setEventData({...eventData, location: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
                <input required type="number" placeholder="Price ($)" value={eventData.price} onChange={(e) => setEventData({...eventData, price: e.target.value})} className="w-full px-4 py-3 bg-[#f2f4f6] rounded-xl outline-none focus:ring-2 focus:ring-[#3525cd]/30" />
              </div>
              <button type="submit" disabled={creating} className="w-full md:w-auto px-8 py-4 mt-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
                {creating ? "Publishing..." : "Publish Event"}
              </button>
            </form>
          </section>
        )}

        {/* ATTENDEE VIEW */}
        {user.role === "attendee" && (
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#eceef0] flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="w-16 h-16 bg-[#e2dfff] text-[#3525cd] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Tickets Yet</h2>
            <p className="text-[#464555] mb-6">You haven't booked any upcoming events.</p>
            <Link href="/explore" className="px-8 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
              Find an Event
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
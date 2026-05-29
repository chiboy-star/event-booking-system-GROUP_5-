"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SingleEventPage() {
  const params = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/events/${params.id}`);
      const data = await res.json();
      if (data.success) setEvent(data.event);
    };
    fetchEvent();
  }, [params.id]);

  if (!event) return <div className="min-h-screen flex items-center justify-center">Loading Event...</div>;

  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#191c1e] p-8 md:p-20">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-[#eceef0] overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-[#3525cd] to-[#4f46e5]"></div>
        <div className="p-10 space-y-6">
          <h1 className="text-4xl font-extrabold">{event.title}</h1>
          <p className="text-xl text-[#3525cd] font-semibold">Hosted by {event.organizer?.organizationName || event.organizer?.fullName}</p>
          
          <div className="flex gap-6 text-[#464555] font-medium border-y border-[#eceef0] py-6">
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <p>💰 {event.price > 0 ? `$${event.price}` : "FREE"}</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-3">About this Event</h3>
            <p className="text-[#464555] leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
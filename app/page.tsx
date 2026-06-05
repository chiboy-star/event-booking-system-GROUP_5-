// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import Navbar from "@/app/components/Navbar";


// Professional fallback images from Unsplash (Tech, Concerts, Networking)
const placeholderImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&auto=format&fit=crop&q=80"
];

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) {
          setFeaturedEvents(data.events.slice(0, 3)); 
        }
      } catch (err) {
        console.error("Failed to load featured events");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans">
      <Navbar />

      <main className="pt-36 pb-20 bg-[#f7f9fb] flex-1">
        <section className="px-6 text-center max-w-4xl mx-auto mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#191c1e] leading-[1.1] mb-6 tracking-tight">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3525cd] to-[#4f46e5]">Next Generation</span> of Events.
          </h1>
          <p className="text-[#464555] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Book tickets to the best tech meetups, concerts, and exclusive workshops near you—or become an organizer and host your own.
          </p>
          
          <Link href="/explore" className="inline-flex items-center gap-2 bg-[#191c1e] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#3525cd] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            Start Exploring 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </section>

        <section className="px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end mb-8 border-b border-[#eceef0] pb-4">
            <h2 className="text-3xl font-extrabold text-[#191c1e] tracking-tight">
              Featured Events
            </h2>
            <Link href="/explore">
              <div className="text-sm font-bold text-[#3525cd] hover:text-[#4d44e3] transition-colors flex items-center gap-1 group">
                View all <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>

          {loading ? (
            /* --- SKELETON LOADERS --- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bg-white rounded-3xl h-[380px] border border-[#eceef0] overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200 w-full"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredEvents.length > 0 ? (
            /* --- REAL DATA --- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event, index) => (
                <article key={event.id} className="bg-white rounded-3xl shadow-sm border border-[#eceef0] overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                    {/* Cycling through the realistic Unsplash images based on index */}
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
                    <h3 className="text-xl text-[#191c1e] font-bold line-clamp-1 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#464555] mb-6">
                      <svg className="w-4 h-4 text-[#3525cd]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    
                    <Link href={`/event/${event.id}`} className="mt-auto block w-full text-center py-3.5 bg-[#f2f4f6] text-[#191c1e] font-bold rounded-xl hover:bg-[#3525cd] hover:text-white transition-colors duration-300">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* --- EMPTY STATE --- */
            <div className="text-center py-24 bg-white rounded-3xl border border-[#eceef0]">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-[#464555] text-lg font-medium">No events currently active.</p>
              <p className="text-slate-400 mt-1">Be the first to create one!</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
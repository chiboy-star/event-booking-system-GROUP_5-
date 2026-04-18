"use client";
import Image from "next/image";
import React, { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Technology', 'Music', 'Business', 'Arts'];

  return (
<<<<<<< Updated upstream
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>Event Booking</h1>
=======
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] font-sans dark:bg-black">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] text-2xl">Gentify</span>
            <span className="text-2xl font-extrabold text-[#3525cd] tracking-tighter">Pulse</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-600 font-semibold hover:text-[#4d44e3] transition-colors">Login</button>
            <button className="bg-[#3525cd] text-white px-5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-500/20">Sign Up</button>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6 bg-white">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-4">
            Discover Experiences That Matter.
          </h1>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
            Book tickets to the best tech meetups, concerts, and workshops near you.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mx-auto mb-12">
            <div className="flex items-center bg-white dark:bg-zinc-900 rounded-full p-2 shadow-xl border border-slate-100 dark:border-zinc-800">
              <div className="pl-4 pr-2 text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 py-3 outline-none" 
                placeholder="Search for events..." 
                type="text"
              />
              <button className="bg-[#3525cd] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#3525cd] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </main>
>>>>>>> Stashed changes
    </div>
  );
}


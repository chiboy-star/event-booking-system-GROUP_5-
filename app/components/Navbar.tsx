// app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.success) setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#eceef0]">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        
        <Link href="/" className="flex items-center gap-2 group">
          <svg className="w-8 h-8 text-[#3525cd] group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-2xl font-extrabold text-[#191c1e] tracking-tighter">
            Tkt<span className="text-[#3525cd]">Master</span>
          </span>
        </Link> 

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-[#464555] font-semibold hover:text-[#3525cd] transition-colors">Explore</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-[#464555] font-semibold hover:text-[#3525cd] transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-xl font-bold hover:bg-red-100 transition-all">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#464555] font-semibold hover:text-[#3525cd] transition-colors">Log In</Link>
              <Link href="/signup" className="bg-[#3525cd] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#3525cd]/25 hover:scale-105 active:scale-95 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-[#191c1e]" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#eceef0] shadow-lg absolute w-full left-0 flex flex-col p-6 gap-4">
          <Link href="/explore" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-[#191c1e]">Explore</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-[#191c1e]">Dashboard</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-lg font-bold text-red-600">Log Out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-[#191c1e]">Log In</Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="text-lg font-bold text-[#3525cd]">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
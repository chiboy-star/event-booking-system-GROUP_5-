// app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "attendee",
    organizationName: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role: "attendee" | "organizer") => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f7f9fb] text-[#191c1e] antialiased min-h-screen flex flex-col md:flex-row">
      {/* ── Left: Pulse Events Hero (Matched to Login) ── */}
      <section className="relative w-full md:w-1/2 min-h-[353px] md:min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-black/10 mix-blend-overlay"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg className="w-10 h-10 text-[#dad7ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8m-4-4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-3xl font-extrabold text-white tracking-tighter">TktMaster</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Join the <span className="text-[#dad7ff] italic">Community</span>.
          </h1>
          <p className="text-[#dad7ff] text-lg leading-relaxed opacity-90">
            Create an account to start booking or hosting extraordinary events.
          </p>
        </div>
      </section>

      {/* ── Right: Form Section ── */}
      <section className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 min-h-screen">
        <div className="w-full max-w-md space-y-6">
          <header className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-[#191c1e] tracking-tight">Create your account</h2>
            <p className="text-[#464555]">Experience the next generation of event discovery.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Toggle */}
            <div className="p-1.5 rounded-xl flex items-center bg-[#f2f4f6]">
              <button
                type="button"
                onClick={() => handleRoleToggle("attendee")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${formData.role === "attendee" ? "bg-[#3525cd] text-white shadow-md" : "text-[#464555]"}`}
              >
                I'm an Attendee
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle("organizer")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${formData.role === "organizer" ? "bg-[#3525cd] text-white shadow-md" : "text-[#464555]"}`}
              >
                I'm an Organizer
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#464555]">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#464555]">Email Address</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#464555]">Password</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 outline-none transition-all"
              />
            </div>

            {/* Org Name (Only visible if Organizer) */}
            {formData.role === "organizer" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-semibold text-[#464555]">
                  Organization Name <span className="text-xs font-normal opacity-70">(Optional)</span>
                </label>
                <input
                  name="organizationName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Your Agency or Brand"
                  className="w-full px-4 py-3 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 outline-none transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            {message && <p className={`text-center mt-2 text-sm font-semibold ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          </form>

          <footer className="text-center pt-6 border-t border-[#eceef0]">
            <p className="text-[#464555] text-sm">
              Already have an account? 
              <Link href="/login" className="text-[#3525cd] font-bold hover:underline decoration-2 underline-offset-4 ml-1">
                Log in.
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
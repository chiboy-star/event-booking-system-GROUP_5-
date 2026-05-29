// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Logged in successfully! Redirecting...");
        // Redirect to dashboard (update this path based on your app structure)
        setTimeout(() => router.push("/dashboard"), 1000);
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
      {/* ── Left: Pulse Events Hero ── */}
      <section className="relative w-full md:w-1/2 min-h-[353px] md:min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-black/10 mix-blend-overlay"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            {/* Simple SVG Compass Icon as placeholder */}
            <svg className="w-10 h-10 text-[#dad7ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8m-4-4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-3xl font-extrabold text-white tracking-tighter">TktMaster</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Discover the <span className="text-[#dad7ff] italic">Extraordinary</span>.
          </h1>
          <p className="text-[#dad7ff] text-lg leading-relaxed opacity-90">
            "Experience is the teacher of all things." — Join our community of explorers today.
          </p>
        </div>
      </section>

      {/* ── Right: Form Section ── */}
      <section className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 min-h-[530px] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <header className="space-y-2">
            <h2 className="text-3xl font-bold text-[#191c1e] tracking-tight">Welcome back</h2>
            <p className="text-[#464555]">Enter your credentials to access your account.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#464555]" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-[#464555]" htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
            {message && <p className={`text-center mt-2 text-sm font-semibold ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          </form>

          <footer className="text-center pt-8 border-t border-[#eceef0]">
            <p className="text-[#464555] text-sm">
              Don't have an account? 
              <Link href="/signup" className="text-[#3525cd] font-bold hover:underline decoration-2 underline-offset-4 ml-1">
                Sign up.
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
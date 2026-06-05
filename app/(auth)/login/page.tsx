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
  const [showPassword, setShowPassword] = useState(false); // NEW STATE

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
          <div className="flex items-center justify-center gap-3 mb-8 group">
            <svg className="w-10 h-10 text-[#dad7ff] group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
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
                <Link href="#" className="text-xs font-semibold text-[#3525cd] hover:text-[#4d44e3] transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3.5 bg-[#f2f4f6] border-none rounded-xl focus:ring-2 focus:ring-[#3525cd]/30 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-[#3525cd] transition-colors outline-none focus:text-[#3525cd]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", { email, password });
      login(response.data.token, response.data.admin);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login min-h-screen overflow-hidden bg-[#090909] text-white">
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-10 lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-rose-300/10 blur-3xl" />
        <div className="grid w-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#211b12] via-[#11100e] to-[#090909] p-10 shadow-2xl shadow-black/30 lg:flex xl:p-14">
            <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-amber-100/10 bg-amber-100/[0.03] blur-sm" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full border border-white/10" />
            <div>
              <div className="relative mb-20 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/30 bg-amber-100/10 text-amber-200 shadow-lg shadow-amber-950/30">
                  <Sparkles size={19} />
                </div>
                <div>
                  <span className="block font-serif text-xl tracking-wide">Elixirr Essence</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">Atelier console</span>
                </div>
              </div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-amber-200/70">The private workspace</p>
              <h1 className="relative max-w-xl font-serif text-5xl leading-[1.05] text-white xl:text-7xl">
                Curate every detail of the experience.
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/45">
                Manage your collection, orders, and brand presence from one calm, considered space.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/35">
              <span>Since 2024</span>
              <span className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-amber-200/70" />
              Secure administrator access
              </span>
            </div>
          </section>

          <section className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="font-serif text-2xl">Elixirr Essence</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
              <div className="mb-9">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Welcome back</p>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-200">Protected</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl">Admin sign in</h2>
                <p className="mt-3 text-sm text-white/40">Enter your details to continue to the dashboard.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div role="alert" className="rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-200">
                    {error}
                  </div>
                )}
                <label className="block text-sm font-medium text-white/65">
              Email
            <div className="relative mt-2">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-white/20 focus:border-amber-200/60 focus:ring-4 focus:ring-amber-200/10"
                placeholder="you@example.com" required />
            </div>
                </label>
                <label className="block text-sm font-medium text-white/65">
              Password
            <div className="relative mt-2">
              <LockKeyhole size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-12 text-white outline-none transition focus:border-amber-200/60 focus:ring-4 focus:ring-amber-200/10"
                placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/30 transition hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
                </label>
                <button type="submit" disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-100 py-3.5 font-medium text-[#17130d] shadow-lg shadow-amber-950/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? "Signing in..." : "Enter dashboard"}
                  {!loading && <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
              <p className="mt-7 text-center text-xs text-white/25">Authorized administrators only · Your session is encrypted</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
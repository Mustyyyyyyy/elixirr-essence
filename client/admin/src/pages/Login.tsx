import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Check,
} from "lucide-react";

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
      const response = await api.post("/admin/login", {
        email,
        password,
      });

      login(response.data.token, response.data.admin);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080706] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#d6a75b]/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#9b7651]/10 blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center px-5 py-6 sm:px-8 lg:px-12">
          <div className="grid w-full overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0d0c0a]/80 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]">

            {/* =====================================================
                LEFT SIDE
            ====================================================== */}
            <section className="relative hidden min-h-[760px] overflow-hidden lg:flex">
              {/* Decorative circles */}
              <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-[#e8c98c]/10" />
              <div className="absolute -right-12 top-20 h-[330px] w-[330px] rounded-full border border-[#e8c98c]/10" />
              <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

              {/* Gold glow */}
              <div className="absolute left-[20%] top-[25%] h-40 w-40 rounded-full bg-[#d6a75b]/10 blur-[90px]" />

              <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                {/* Brand */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e5c58b]/20 bg-[#e5c58b]/[0.08]">
                    <Sparkles
                      size={19}
                      strokeWidth={1.5}
                      className="text-[#e8c98c]"
                    />
                  </div>

                  <div>
                    <p className="font-serif text-[22px] tracking-wide text-[#f6ead1]">
                      Elixirr Essence
                    </p>

                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.35em] text-white/30">
                      Atelier Console
                    </p>
                  </div>
                </div>

                {/* Main content */}
                <div className="max-w-xl">
                  <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-10 bg-[#d8b878]/50" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#d8b878]">
                      Private workspace
                    </span>
                  </div>

                  <h1 className="font-serif text-[56px] leading-[1.02] tracking-[-0.03em] text-[#f8f1e5] xl:text-[76px]">
                    Curate the
                    <br />
                    <span className="italic text-[#d8b878]">
                      extraordinary.
                    </span>
                  </h1>

                  <p className="mt-8 max-w-md text-[15px] leading-7 text-white/40">
                    Manage your collections, orders, customers and brand
                    experience from one beautifully considered space.
                  </p>

                  {/* Features */}
                  <div className="mt-10 space-y-3">
                    {[
                      "Collection management",
                      "Order & customer insights",
                      "Secure administrator access",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-white/50"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d8b878]/20 bg-[#d8b878]/[0.06]">
                          <Check
                            size={11}
                            className="text-[#d8b878]"
                            strokeWidth={2}
                          />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex items-end justify-between border-t border-white/[0.07] pt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                      Elixirr Essence
                    </p>

                    <p className="mt-2 text-xs text-white/30">
                      Since 2024
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
                    <ShieldCheck size={15} className="text-[#d8b878]/70" />
                    Protected workspace
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================
                RIGHT SIDE
            ====================================================== */}
            <section className="flex min-h-[760px] items-center justify-center border-white/[0.06] bg-[#11100e]/70 px-5 py-10 sm:px-10 lg:border-l xl:px-16">
              <div className="w-full max-w-[400px]">

                {/* Mobile brand */}
                <div className="mb-12 flex items-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5c58b]/20 bg-[#e5c58b]/[0.08]">
                    <Sparkles
                      size={18}
                      className="text-[#e8c98c]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="font-serif text-xl text-[#f6ead1]">
                      Elixirr Essence
                    </p>

                    <p className="text-[8px] uppercase tracking-[0.3em] text-white/25">
                      Atelier Console
                    </p>
                  </div>
                </div>

                {/* Header */}
                <div className="mb-10">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#d8b878]">
                      Welcome back
                    </span>

                    <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                      <span className="text-[9px] uppercase tracking-[0.15em] text-emerald-200/60">
                        Secure
                      </span>
                    </div>
                  </div>

                  <h2 className="font-serif text-[42px] leading-tight tracking-[-0.02em] text-[#f8f1e5]">
                    Admin sign in
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
                    Enter your administrator credentials to continue to the
                    private workspace.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Error */}
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-400/10 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200/80"
                    >
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/40"
                    >
                      Email address
                    </label>

                    <div className="group relative">
                      <Mail
                        size={17}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-[#d8b878]"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="h-[54px] w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/15 hover:border-white/[0.13] focus:border-[#d8b878]/40 focus:bg-[#d8b878]/[0.025] focus:ring-4 focus:ring-[#d8b878]/[0.05]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40"
                      >
                        Password
                      </label>
                    </div>

                    <div className="group relative">
                      <LockKeyhole
                        size={17}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-[#d8b878]"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        className="h-[54px] w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/15 hover:border-white/[0.13] focus:border-[#d8b878]/40 focus:bg-[#d8b878]/[0.025] focus:ring-4 focus:ring-[#d8b878]/[0.05]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((visible) => !visible)
                        }
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/25 transition hover:bg-white/[0.05] hover:text-white/70"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={17} strokeWidth={1.5} />
                        ) : (
                          <Eye size={17} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 flex h-[55px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#e5c98f] text-sm font-medium text-[#17130d] shadow-[0_10px_40px_rgba(210,170,95,0.12)] transition-all duration-300 hover:bg-[#f2dfb3] hover:shadow-[0_12px_45px_rgba(210,170,95,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {loading ? "Authenticating..." : "Enter dashboard"}
                    </span>

                    {!loading && (
                      <ArrowRight
                        size={17}
                        strokeWidth={1.8}
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}

                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#17130d]/20 border-t-[#17130d]" />
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-10">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="h-px flex-1 bg-white/[0.06]" />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                      Authorized access
                    </span>

                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  <p className="text-center text-[10px] leading-5 text-white/20">
                    This area is restricted to authorized administrators.
                    <br />
                    Your session is securely protected.
                  </p>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

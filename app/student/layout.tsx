"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  LogIn,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  User,
} from "lucide-react";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/courses", icon: BookOpen },
    { label: "Fees & Payment", href: "/student/payment", icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
    router.push("/student/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Tag */}
            <div className="flex items-center gap-6">
              <Link href="/student/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5532] to-[#ff3b14] flex items-center justify-center text-white shadow-md shadow-[#ff5532]/25 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg tracking-tight text-slate-900">
                      NETCODER
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff5532]/10 text-[#ff5532] border border-[#ff5532]/20 uppercase tracking-wider">
                      Student
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-none">
                    Learner Portal & LMS
                  </p>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1 ml-4">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/student/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-[#ff5532] text-white shadow-sm shadow-[#ff5532]/25"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Tools & Profile */}
            <div className="hidden md:flex items-center gap-3">
              {/* DRM Active Shield Badge */}
              <div
                title="DRM Watermark Protection is Active for this session"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium cursor-help"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>DRM Shield Active</span>
              </div>

              {/* Switch to Classroom or Main Site */}
              <Link
                href="/lms/classroom"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Live Classroom</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>

              {/* User Account / Auth Button */}
              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="flex items-center gap-2 text-right">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs uppercase overflow-hidden">
                      {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name?.slice(0, 2) || "ST"
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {user.name || "Student"}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[110px]">
                        {user.email || "student@netcoder.in"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/student/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff5532] text-white text-xs font-bold hover:bg-[#e04524] transition-colors shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Student Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DRM Session Protected: Verified Learner</span>
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? "bg-[#ff5532] text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/lms/classroom"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700"
              >
                <span>Open Video Classroom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout ({user.name})</span>
                </button>
              ) : (
                <Link
                  href="/student/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ff5532] text-white text-xs font-bold"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Student Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Student Portal Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Netcoder Technology LMS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <Link href="/student/dashboard" className="hover:text-[#ff5532]">Dashboard</Link>
            <Link href="/student/courses" className="hover:text-[#ff5532]">Courses</Link>
            <Link href="/student/payment" className="hover:text-[#ff5532]">Fee Ledger</Link>
            <Link href="/student/login" className="hover:text-[#ff5532]">Auth</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

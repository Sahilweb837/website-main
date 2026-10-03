"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "./SidebarContext";
import { useSidebar } from "./SidebarContext";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutInner({ children }: AdminLayoutProps) {
  const { isCollapsed, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      
      {/* Main Content */}
      <main
        className={`
          lg:ml-64 transition-all duration-300 ease-in-out min-h-screen
          ${isCollapsed ? "lg:ml-16" : ""}
        `}
        style={{ marginLeft: isMobileOpen ? "16rem" : 0 }}
      >
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => {
              const event = new CustomEvent("toggle-mobile-sidebar");
              window.dispatchEvent(event);
            }}
            className="p-2 rounded-lg bg-white shadow-lg border border-slate-200"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-8 pt-4 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SidebarProvider>
  );
}
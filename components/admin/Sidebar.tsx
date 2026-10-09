"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import {
  LayoutDashboard,
  Video,
  Users,
  BookOpen,
  Code2,
  Shield,
  FileText,
  MessageSquare,
  Film,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { key: "classes", label: "Live Classes", icon: Video, href: "/admin/dashboard?tab=classes" },
  { key: "mentorHub", label: "Mentor Hub", icon: Users, href: "/admin/dashboard?tab=mentorHub" },
  { key: "courses", label: "Courses", icon: Code2, href: "/admin/dashboard?tab=courses", children: [
    { key: "courses-list", label: "All Courses", href: "/admin/dashboard?tab=courses" },
    { key: "video-manager", label: "Video Manager", href: "/admin/dashboard?tab=videoManager", icon: Film },
  ]},
  { key: "lms", label: "LMS & DRM", icon: Shield, href: "/lms/select-course" },
  { key: "articles", label: "Articles", icon: FileText, href: "/admin/dashboard?tab=overview" },
  { key: "feedback", label: "Feedback", icon: MessageSquare, href: "/admin/dashboard?tab=feedback" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const { isCollapsed, toggleSidebar, closeMobileSidebar, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const getActiveKey = () => {
    const params = new URLSearchParams(pathname.split("?")[1] || "");
    return params.get("tab") || "overview";
  };

  const activeKey = getActiveKey();

  const handleItemClick = (key: string) => {
    if (isCollapsed && !NAV_ITEMS.find((item) => item.key === key)?.children) {
      return;
    }
    if (NAV_ITEMS.find((item) => item.key === key)?.children) {
      setExpandedItem((prev) => (prev === key ? null : key));
    } else {
      closeMobileSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out flex flex-col
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
        style={{ height: "100vh" }}
        role="navigation"
        aria-label="Admin navigation"
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          <Link href="/admin/dashboard" className="flex items-center gap-3" aria-label="Netcoder Admin">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl text-slate-900 whitespace-nowrap">
                Netcoder Admin
              </span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1" role="menubar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeKey === item.key || 
              (item.children && item.children.some((child) => activeKey === child.key));
            const isExpanded = expandedItem === item.key;
            const hasChildren = item.children && item.children.length > 0;
            const itemClassName = `
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              ${isActive
                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-100"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
              ${isCollapsed && !hasChildren ? "justify-center" : ""}
            `;
            const itemContent = (
              <>
                <item.icon size={20} className="flex-shrink-0" aria-hidden="true" />
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">{item.label}</span>
                )}
                {!isCollapsed && hasChildren && (
                  <span className="ml-auto transition-transform duration-200">
                    {isExpanded ? <ChevronRight size={16} /> : <ChevronRight size={16} className="rotate-90" />}
                  </span>
                )}
              </>
            );

            return (
              <div key={item.key} className="group">
                {hasChildren ? (
                  <button
                    onClick={() => handleItemClick(item.key)}
                    className={itemClassName}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={isExpanded}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {itemContent}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileSidebar}
                    className={itemClassName}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {itemContent}
                  </Link>
                )}

                {/* Sub-menu */}
                {!isCollapsed && hasChildren && isExpanded && (
                  <div className="mt-1 ml-10 space-y-1 animate-slideDown" role="menu">
                    {item.children.map((child) => {
                      const childActive = activeKey === child.key;
                      return (
                        <Link
                          key={child.key}
                          href={child.href}
                          onClick={closeMobileSidebar}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                            ${childActive
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                          `}
                          role="menuitem"
                          aria-current={childActive ? "page" : undefined}
                        >
                          {child.icon && <child.icon size={16} className="flex-shrink-0" aria-hidden="true" />}
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          {!isCollapsed && (
            <div className="text-xs text-slate-400 text-center">
              Netcoder Technology LMS v2.0
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </>
  );
}
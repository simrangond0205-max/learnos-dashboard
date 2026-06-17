import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Activity, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { id: "courses", href: "/courses", icon: BookOpen, label: "Courses" },
  { id: "activity", href: "/activity", icon: Activity, label: "Activity" },
  { id: "settings", href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen fixed top-0 left-0 border-r border-border/50 bg-background/50 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="font-bold text-primary">L</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden lg:block">LearnOS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.id} href={item.href} className="block relative">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors duration-200 relative z-10",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium hidden lg:block">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl z-0 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium hidden lg:block">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.id} href={item.href} className="relative p-2 rounded-xl flex-1 flex justify-center">
              <div
                className={cn(
                  "p-2 rounded-xl relative z-10 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-6 h-6" />
              </div>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-highlight"
                  className="absolute inset-1 bg-primary/10 border border-primary/20 rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

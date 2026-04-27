"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Bell, Search, Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-96">
              <Search size={18} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search management records..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <button className="relative p-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 lg:pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-dark">Admin User</p>
                <p className="text-xs text-slate-500 font-medium truncate max-w-[100px]">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green font-bold border border-primary-green/20">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-col w-full">
          {/* Ensure full-width border */}
          <header className="flex h-16 items-center gap-4 border-b border-stone-200 bg-background px-6 w-full">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg leading-none">
              Financial Dashboard
            </h1>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarContainer;

// components/Sidebar.tsx
import React from "react";
import { Home } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
    isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <aside
            className={`fixed left-0 z-30 w-64 h-screen pt-16 border-r transform transition-transform duration-200 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0`}
        >
            <div className="flex flex-col h-full">
                <ScrollArea className="flex-1">
                    <nav className="p-4 space-y-2">
                        <a
                            href="#overview"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-100"
                        >
                            <Home className="h-5 w-5 mr-3" />
                            Overview
                        </a>
                    </nav>
                </ScrollArea>
            </div>
        </aside>
    );
};

// components/Header.tsx
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
    toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 border-b bg-white">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                {/* Left side: Logo and Menu Button */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    <span className="ml-2 text-xl font-bold">
                        Procurement Dashboard 2
                    </span>
                </div>

                {/* Right side: Navigation Links (optional) */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#">Link 1</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#">Link 2</NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* Add more links as needed */}
                </NavigationMenu>
            </div>
        </header>
    );
};

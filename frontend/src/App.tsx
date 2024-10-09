import { useState } from "react";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Dashboard } from "./components/dashboard";

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} />
                <main
                    className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
                        isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
                >
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}

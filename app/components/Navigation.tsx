import { LucideCog, LucideCompass, LucideHeart, LucideInfo } from "lucide-react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

const navigationTopTabs = [
    {
        to: "/",
        icon: LucideCompass,
    },
];

const navigationBottomTabs = [
    {
        to: "/settings",
        icon: LucideCog,
    },
    {
        to: "/donate",
        icon: LucideHeart,
    },
    {
        to: "/about",
        icon: LucideInfo,
    },
];

export function Navigation() {
    return (
        <nav className="z-10 overflow-auto flex md:flex-col gap-2 md:justify-between items-center px-6 pb-0 [@media(display-mode:standalone)]:pb-[calc(var(--spacing)*3.5+env(safe-area-inset-bottom))] order-1 md:order-0 md:py-8 md:px-0 sticky bottom-0 md:left-0 md:top-0 md:w-24 md:h-screen w-full h-[calc(var(--spacing)*20+env(safe-area-inset-bottom))] bg-dark-900 md:border-t-0 md:border-r md:border-r-dark-800 border-t border-t-dark-800">
            <img src="logo.svg" className="w-8 h-8 mr-4 md:mx-auto md:mb-4" />
            {navigationTopTabs.map((tab) => (
                <NavLink to={tab.to} className={({ isActive }) => twMerge("transition duration-250 ease-in-out flex flex-col items-center justify-center p-4 hover:bg-dark-800", isActive && "bg-dark-800 rounded-md")}>
                    <tab.icon className="w-5 h-5" />
                </NavLink>
            ))}
            <div className="md:flex-1 hidden md:block" />
            {navigationBottomTabs.map((tab) => (
                <NavLink to={tab.to} className={({ isActive }) => twMerge("transition duration-250 ease-in-out flex flex-col items-center justify-center p-4 hover:bg-dark-800", isActive && "bg-dark-800 rounded-md")}>
                    <tab.icon className="w-5 h-5" />
                </NavLink>
            ))}
        </nav>
    );
}
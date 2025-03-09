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
        <nav className="flex md:flex-col md:justify-between gap-2 px-6 py-8 md:px-0 sticky order-1 md:order-0 md:top-0 md:w-24 md:h-screen bottom-0 left-0 w-screen h-12 bg-dark-900 md:border-t-0 md:border-r md:border-r-dark-800 border-t border-t-dark-800">
            <div className="flex md:flex-col gap-6 items-center">
                <img src="logo.svg" className="w-8 h-8" />
                {navigationTopTabs.map((tab) => (
                    <NavLink to={tab.to} className={({ isActive }) => twMerge("transition duration-250 ease-in-out flex flex-col items-center justify-center p-2 md:p-4 hover:bg-dark-800", isActive && "bg-dark-800 rounded-md")}>
                        <tab.icon className="w-5 h-5" />
                    </NavLink>
                ))}
            </div>
            <div className="flex md:flex-col gap-2 items-center">
                {navigationBottomTabs.map((tab) => (
                    <NavLink to={tab.to} className={({ isActive }) => twMerge("transition duration-250 ease-in-out flex flex-col items-center justify-center p-2 md:p-4 hover:bg-dark-800", isActive && "bg-dark-800 rounded-md")}>
                        <tab.icon className="w-5 h-5" />
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
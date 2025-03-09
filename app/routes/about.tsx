import { TransitionWrapper } from "~/components/TransitionWrapper";
import type { Route } from "./+types/about";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Commute" },
        { description: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
        { property: "og:title", content: "Commute" },  
        { property: "og:description", content: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
    ];
}

export default function About() {
    return (
        <main className="container mx-auto px-8 py-10 min-h-screen flex flex-col">
            <TransitionWrapper>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About</h1>
                    <h2 className="mt-8 text-lg md:text-xl font-semibold">
                        The Best Way to Plan Your Trip
                    </h2>
                    <p className="mt-2">
                        The project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists. No ads, no trackers, no paywalls — just reliable and seamless functionality wherever and whenever you need it.
                    </p>
                    <h2 className="mt-8 text-lg md:text-xl font-semibold">
                        Motivation
                    </h2>
                    <p className="mt-2">
                        Commute was developed for the public good, prioritising user protection from ads and malware found in alternative solutions. We believe software should be open, accessible, and secure.
                    </p>
                    <h2 className="mt-8 text-lg md:text-xl font-semibold">
                        Open
                    </h2>
                    <p className="mt-2">
                        We stay closely connected with our community, collaborating to make Commute even more valuable. Explore our source code and contribute on <Link to="https://github.com/zackptr/commute-my" className="underline underline-offset-4">GitHub</Link> — we greatly appreciate your feedback and support!
                    </p>
            </TransitionWrapper>
        </main>
    );
}
import { TransitionWrapper } from "~/components/TransitionWrapper";
import type { Route } from "./+types/home";
import { getLinesByType, type LineType } from "~/lib/line";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "PubSit" },
    ];
}

function Transportation({
    name,
    type,
}: {
    name: string;
    type: LineType;
}) {
    return (
        <div>
            <h2 className="font-semibold text-2xl md:text-3xl mb-4">{name}</h2>
            <div className="flex flex-col gap-4">
                {getLinesByType(type).map((line) => (
                    <Link key={line.id} to={`/line/${line.id}`} className={`px-5 py-4 rounded-lg flex gap-6 items-center ${line.color} bg-opacity-50 hover:bg-opacity-60 duration-300 ease-in-out`}>
                        <span className={`font-bold px-5 py-0.5 rounded-lg ${line.color} bg-opacity-60 shadow-md`}>{line.id}</span>
                        {line.name} Line
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="container mx-auto px-8 py-20">
            <TransitionWrapper>
                <section>
                    <h1 className="text-4xl md:text-6xl font-bold">Get Started</h1>
                    <p className="mt-4">Explore all MRT and LRT lines in the Klang Valley, including routes, stations, and essential details to plan your journey seamlessly.</p>
                    <div className="grid md:grid-cols-3 mt-10 gap-6">
                        <Transportation name="Light Rapid Transit (LRT)" type="LRT" />
                        <Transportation name="Mass Rapid Transit (MRT)" type="MRT" />
                        <Transportation name="Monorail (MR)" type="MR" />
                    </div>
                </section>
                <section className="mt-20">
                    <h1 className="text-2xl md:text-4xl font-bold">What is PubSit?</h1>
                    <h2 className="mt-5 text-lg md:text-xl font-semibold">
                        The Best Way to Plan Your Trip
                    </h2>
                    <p className="mt-2">
                        The project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists. No ads, no trackers, no paywalls — just reliable and seamless functionality wherever and whenever you need it.
                    </p>
                    <h2 className="mt-4 text-lg md:text-xl font-semibold">
                        Motivation
                    </h2>
                    <p className="mt-2">
                        PubSit was developed for the public good, prioritising user protection from ads and malware found in alternative solutions. We believe software should be open, accessible, and secure.
                    </p>
                    <h2 className="mt-4 text-lg md:text-xl font-semibold">
                        Open
                    </h2>
                    <p className="mt-2">
                        We stay closely connected with our community, collaborating to make PubSit even more valuable. Explore our source code and contribute on <Link to="https://github.com/zackptr/pubsit" className="underline underline-offset-4">GitHub</Link> — we greatly appreciate your feedback and support!
                    </p>
                </section>
                <p className="text-xs mt-12">&copy; {new Date().getFullYear()} Zackry Rosli. All rights reserved.</p>    
            </TransitionWrapper>
        </main>
    );
}

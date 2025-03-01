import { TransitionWrapper } from "~/components/TransitionWrapper";
import type { Route } from "./+types/home";
import { lines } from "~/lib/line";
import { Link } from "react-router";
import { LucideArrowUpDown, LucideCircleDot, LucideMapPin, LucideTrain, Train } from "lucide-react";
import { Button } from "~/components/Button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Commute" },
        { description: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
        { property: "og:title", content: "Commute" },  
        { property: "og:description", content: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
    ];
}

export default function Home() {
    return (
        <main className="container mx-auto px-8 py-14 md:py-20">
            <TransitionWrapper>
                <section>
                    <div className="bg-dark-900 px-5 py-5 rounded-md border border-dark-800 grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Let's Explore Klang Valley</p>
                            <form className="mt-5">
                                <div className="relative rounded-md border border-dark-800">
                                    <div className="relative flex flex-row gap-4 items-center border-b border-b-dark-800">
                                        <LucideCircleDot className="absolute w-4 h-4 ml-6 text-steel-blue-200" />
                                        <input className="pl-16 py-3.5 pr-4 w-full placeholder:text-sm disabled:placeholder:text-dark-800" placeholder="Origin" disabled />
                                    </div>
                                    <div className="relative flex flex-row gap-4 items-center">
                                        <LucideMapPin className="absolute w-4 h-4 ml-6 text-steel-blue-200" />
                                        <input className="pl-16 py-3.5 pr-4 w-full placeholder:text-sm disabled:placeholder:text-dark-800" placeholder="Destination" disabled />
                                    </div>
                                    <div className="absolute top-[calc(50%-1.25rem)] right-4">
                                        <div className="p-3 rounded-full bg-steel-blue-200">
                                            <LucideArrowUpDown className="w-3.5 h-3.5 text-steel-blue-800" />
                                        </div>
                                    </div>
                                </div>
                                <Button.Root className="mt-6 w-full" type="submit" disabled>
                                    <Button.Text>Search Route</Button.Text>
                                </Button.Root>
                                <p className="text-yellow-500 text-xs mt-4">This feature is not currently available. We are working to implement it in a future update and appreciate your patience.</p>
                            </form>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <p className="font-semibold">Line Route</p>
                            <div className="grid grid-cols-2 gap-3 mt-5">
                                {lines.map((line) => (
                                    <Link to={`/line/${line.id}`}>
                                        <Button.Root className="w-full h-full" variant={line.color}>
                                            <Button.Text>{line.type} {line.name}</Button.Text>
                                        </Button.Root>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <h1 className="text-4xl md:text-6xl font-bold">Get Started</h1>
                    <p className="mt-4">Explore all MRT and LRT lines in the Klang Valley, including routes, stations, and essential details to plan your journey seamlessly.</p>
                    <div className="grid md:grid-cols-3 mt-10 gap-6">
                        {lines.map((line) => (
                            <Link key={line.id} to={`/line/${line.id}`} className={`font-semibold tracking-wide px-5 py-4 rounded-lg flex gap-6 items-center ${line.color} bg-opacity-50 hover:bg-opacity-60 duration-300 ease-in-out`}>
                                <span className={`flex items-center font-bold px-3 py-0.5 rounded-lg ${line.color} bg-opacity-60 shadow-md`}>
                                    <Train className="w-5 h-5 mr-2 text-white" />
                                    {line.id}
                                </span>
                                {line.type} {line.name} Line
                            </Link>
                        ))}
                    </div> */}
                </section>
                <section className="mt-20">
                    <h1 className="text-2xl md:text-4xl font-bold">What is Commute?</h1>
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
                        Commute was developed for the public good, prioritising user protection from ads and malware found in alternative solutions. We believe software should be open, accessible, and secure.
                    </p>
                    <h2 className="mt-4 text-lg md:text-xl font-semibold">
                        Open
                    </h2>
                    <p className="mt-2">
                        We stay closely connected with our community, collaborating to make Commute even more valuable. Explore our source code and contribute on <Link to="https://github.com/zackptr/commute-my" className="underline underline-offset-4">GitHub</Link> — we greatly appreciate your feedback and support!
                    </p>
                </section>
                <p className="text-xs mt-12">&copy; {new Date().getFullYear()} Zackry Rosli. All rights reserved.</p>    
            </TransitionWrapper>
        </main>
    );
}

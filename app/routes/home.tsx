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
        <main className="container mx-auto p-6 min-h-screen flex flex-col justify-center">
            <TransitionWrapper>
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
            </TransitionWrapper>
        </main>
    );
}

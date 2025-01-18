import { TransitionWrapper } from "~/components/TransitionWrapper";
import type { Route } from "./+types/home";
import { getLinesByType, type LineType } from "~/lib/line";

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
                    <a key={line.id} href={`/line/${line.id}`} className={`px-5 py-4 rounded-lg flex gap-6 items-center ${line.color} bg-opacity-50`}>
                        <span className={`font-bold px-5 py-0.5 rounded-lg ${line.color} bg-opacity-60 shadow-md`}>{line.id}</span>
                        {line.name} Line
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="container mx-auto px-8 py-20">
            <TransitionWrapper key="home">
                <h1 className="text-4xl md:text-6xl font-bold">Malaysia Public Transportation</h1>
                <div className="grid md:grid-cols-3 mt-10 gap-6">
                    <Transportation name="Light Rapid Transit (LRT)" type="LRT" />
                    <Transportation name="Mass Rapid Transit (MRT)" type="MRT" />
                    <Transportation name="Monorail (MR)" type="MR" />
                </div>
                <p className="text-xs mt-12">&copy; {new Date().getFullYear()} Zackry Rosli. All right reserved.</p>
            </TransitionWrapper>
        </main>
    );
}

import { TransitionWrapper } from "~/components/TransitionWrapper";

export default function Settings() {
    return (
        <main className="container mx-auto px-8 py-10 min-h-screen flex flex-col">
            <TransitionWrapper>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Settings</h1>
                <p className="mt-4 text-white/70">commute-my/frontend v0.0.1-beta</p>
            </TransitionWrapper>
        </main>
    );
}
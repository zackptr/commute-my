import { LucideCoffee, LucideGithub, LucideWallet } from "lucide-react";
import { Link } from "react-router";
import { TransitionWrapper } from "~/components/TransitionWrapper";

export default function Donate() {
    return (
        <main className="container mx-auto px-8 py-10 min-h-screen flex flex-col">
            <TransitionWrapper>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Donate</h1>
                <p className="mt-4">
                    Love using this public transport journey planner? Support our work to keep it running smoothly and growing! Your contributions directly fund maintenance, new features, and up-to-date transit information. Every donation, regardless of size, helps sustain this open-source project and improves public transportation accessibility for all users. Thanks for considering a contribution!
                </p>
                <div className="mt-8 flex flex-col gap-4">
                    <Link className="flex gap-3 items-center" to="https://github.com/sponsors/zackptr">
                        <LucideGithub className="w-5 h-5" />
                        GitHub Sponsor
                    </Link>
                    <Link className="flex gap-3 items-center" to="https://ko-fi.com/zackptr">
                        <LucideCoffee className="w-5 h-5" />
                        Ko-fi
                    </Link>
                    <p className="flex gap-3">
                        <LucideWallet className="w-5 h-5 flex-shrink-0" />
                        Ethereum
                        <code className="break-all">0x57858A202589D33d47D3322C26380a2142388E64</code>
                    </p>
                </div>
            </TransitionWrapper>
        </main>
    );
}
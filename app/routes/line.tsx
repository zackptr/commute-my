import type { Route } from "./+types/home";
import { getLineById, getLinesByType, type LineType } from "~/lib/line";
import { useParams } from "react-router";
import { Train, Coffee, ShoppingBag, Building, TreesIcon as Tree } from "lucide-react";

const icons = {
    mall: ShoppingBag,
    park: Tree,
    building: Building,
    default: Coffee,
};

function getNearbyIcon(place: string): React.ElementType {
    if (place.toLowerCase().includes('mall') || place.toLowerCase().includes('point')) return icons.mall;
    if (place.toLowerCase().includes('park') || place.toLowerCase().includes('nature')) return icons.park;
    if (place.toLowerCase().includes('centre') || place.toLowerCase().includes('stadium')) return icons.building;
    
    return icons.default;
}

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
                <a key={line.id} href={`/${line.id}`} className={`px-5 py-4 rounded-lg flex gap-6 items-center ${line.color} bg-opacity-30`}>
                    <span className={`font-bold px-5 py-0.5 rounded-lg ${line.color} bg-opacity-60 shadow-md`}>{line.id}</span>
                    {line.name} Line
                </a>
                ))}
            </div>
        </div>
    );
}

export default function Line() {
    let { id } = useParams();
    const line = getLineById(id!);
    
    return (
        <main className="container mx-auto px-8 py-20">   
            {line ? (
                <div className="flex flex-col space-y-8">
                    {line.stations.map((station, index) => (
                        <div key={station.name} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                                    <Train className="w-5 h-5 text-white" />
                                </div>
                                {index < line.stations.length - 1 && <div className="w-1 h-24 bg-red-600 mt-2" />}
                            </div>
                            <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{station.name}</h3>
                            <div className="mt-2 space-y-2">
                                {station.nearby && station.nearby.map((place, placeIndex) => {
                                    const Icon = getNearbyIcon(place)
                                    return (
                                        <div key={placeIndex} className="flex items-center space-x-2">
                                            <Icon className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm text-gray-600">{place}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            ): (
                <p>Line not found.</p>
            )}
        </main>
    );
}

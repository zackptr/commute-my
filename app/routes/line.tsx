import type { Route } from "./+types/home";
import { getLineById, getLineByStation, getStation } from "~/lib/line";
import { Link, useParams } from "react-router";
import { Train, ShoppingBag, Building, TreesIcon as Tree, ArrowLeftFromLine, Footprints, ArrowUpDown, MapPin, Clock, MoonStar } from "lucide-react";
import { useNavigate } from "react-router";
import { TransitionWrapper } from "~/components/TransitionWrapper";

const icons = {
    mall: ShoppingBag,
    park: Tree,
    default: Building,
};

function getMosqueGoogleMapsUrl(name: string, lat: number, lng: number): string {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
}

function getNearbyIcon(place: string): React.ElementType {
    if (place.toLowerCase().includes('mall') || place.toLowerCase().includes('shopping')) return icons.mall;
    if (place.toLowerCase().includes('park') || place.toLowerCase().includes('nature')) return icons.park;
    
    return icons.default;
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Commute" },
        { description: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
        { property: "og:title", content: "Commute" },  
        { property: "og:description", content: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
    ];
}

export default function Line() {
    let { id } = useParams();
    const line = getLineById(id!);  
    const navigate = useNavigate();  

    return (
        <main className="container mx-auto px-8 py-20">
            <TransitionWrapper key={`line-${id}`}>
                <button className="flex items-center text-sm" onClick={() => navigate(-1)}>
                    <ArrowLeftFromLine className="w-5 h-5 text-white mr-4" />
                    Back
                </button>
                {line ? (
                    <div className="flex flex-col space-y-8 mt-8">
                        {line.stations.map((station, index) => (
                            <div id={station.id} key={station.id} className="flex space-x-4">
                                <div className="flex flex-col items-center min-h-max">
                                    <div className={`w-8 h-8 rounded-full ${line.bgColor} flex items-center justify-center`}>
                                        <Train className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-grow">
                                        {index < line.stations.length - 1 && <div className={`w-1 ${station.nearby || station.connectingStations || station.interchangeStations ? "h-full": "h-6"} ${line.bgColor} mt-2`} />}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {station.name} {station.id}
                                    </h3>
                                    <div className="mt-2 space-y-4">
                                        {station.nearby && (
                                            <div className="space-y-2">
                                                <h3 className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Nearby Highlights</h3>
                                                <div className="grid md:grid-cols-4 gap-2 md:gap-4 mt-2">
                                                    {station.nearby.map((place, ix) => {
                                                        const Icon = getNearbyIcon(place);

                                                        return (
                                                            <div key={ix} className={`flex items-center space-x-2 bg-gray-800 px-5 py-2 rounded-lg w-full min-w-0`}>
                                                                <Icon className="w-4 h-4 flex-shrink-0" />
                                                                <span className="text-sm truncate min-w-0">{place}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {station.mosques && (
                                            <div className="space-y-2">
                                                <h3 className="flex items-center"><MoonStar className="w-4 h-4 mr-2" />Nearby Mosques</h3>
                                                <div className="grid md:grid-cols-4 gap-2 md:gap-4 mt-2">
                                                    {station.mosques.map((mosque, ix) => (
                                                        <a 
                                                            key={ix} 
                                                            href={getMosqueGoogleMapsUrl(mosque.name, mosque.lat, mosque.lng)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gray-800 px-5 py-3 rounded-lg space-y-2 hover:bg-gray-700 transition-colors"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <MoonStar className="w-4 h-4 flex-shrink-0" />
                                                                <span className="text-sm font-medium">{mosque.name}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-gray-400">
                                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                                <span className="text-xs">{mosque.distance}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-gray-400">
                                                                <Clock className="w-3 h-3 flex-shrink-0" />
                                                                <span className="text-xs">{mosque.walkingTime}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {station.interchangeStations && (
                                            <div className="space-y-2">
                                                <h3 className="flex items-center"><ArrowUpDown className="w-4 h-4 mr-2" /> Interchange Stations</h3>
                                                <div className="grid md:grid-cols-4 gap-2 md:gap-4 mt-2">
                                                    {station.interchangeStations.map((intStationId) => {
                                                        const intStation = getStation(intStationId);
                                                        const line = getLineByStation(intStationId);

                                                        return intStation && line && (
                                                            <Link to={`/line/${line.id}#${intStation.id}`} key={intStation.id} className={`flex items-center space-x-2 ${line.bgColor} bg-opacity-50 px-5 py-2 rounded-lg hover:bg-opacity-60 duration-300 ease-in-out`}>
                                                                <Train className="w-4 h-4" />
                                                                <span className="text-sm">{line.type} {intStation.name} {intStation.id}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {station.connectingStations && (
                                            <div className="space-y-2">
                                                <h3 className="flex items-center"><Footprints className="w-4 h-4 mr-2" /> Connecting Stations</h3>
                                                <div className="grid md:grid-cols-4 gap-2 md:gap-4 mt-2">
                                                    {station.connectingStations.map((connStationId) => {
                                                        const connStation = getStation(connStationId);
                                                        const line = getLineByStation(connStationId);

                                                        return connStation && line && (
                                                            <Link to={`/line/${line.id}#${connStation.id}`} key={connStation.id} className={`flex items-center space-x-2 ${line.bgColor} bg-opacity-50 px-5 py-2 rounded-lg hover:bg-opacity-60 duration-300 ease-in-out`}>
                                                                <Train className="w-4 h-4" />
                                                                <span className="text-sm">{line.type} {connStation.name} {connStation.id}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ): (
                    <p>Line not found.</p>
                )}
                <p className="text-xs mt-12">&copy; {new Date().getFullYear()} Zackry Rosli. All rights reserved.</p>
            </TransitionWrapper>
        </main>
    );
}

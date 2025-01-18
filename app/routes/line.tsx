import type { Route } from "./+types/home";
import { getLineById, getLineByStation, getStation } from "~/lib/line";
import { useParams } from "react-router";
import { Train, ShoppingBag, Building, TreesIcon as Tree, ArrowLeftFromLine } from "lucide-react";
import { useNavigate } from "react-router";
import { TransitionWrapper } from "~/components/TransitionWrapper";

const icons = {
    mall: ShoppingBag,
    park: Tree,
    default: Building,
};

function getNearbyIcon(place: string): React.ElementType {
    if (place.toLowerCase().includes('mall') || place.toLowerCase().includes('shopping')) return icons.mall;
    if (place.toLowerCase().includes('park') || place.toLowerCase().includes('nature')) return icons.park;
    
    return icons.default;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PubSit" },
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
                            <div key={station.name} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full ${line.color} flex items-center justify-center`}>
                                        <Train className="w-5 h-5 text-white" />
                                    </div>
                                    {index < line.stations.length - 1 && <div className={`w-1 h-24 ${line.color} mt-2`} />}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">
                                        {station.id} {station.name}
                                    </h3>
                                    <div className="mt-2 space-y-4">
                                        {station.nearby && (
                                            <div className="space-y-2">
                                                <h3>Places Nearby</h3>
                                                {station.nearby.map((place, placeIndex) => {
                                                    const Icon = getNearbyIcon(place)
                                                    return (
                                                        <div key={placeIndex} className="flex items-center space-x-2">
                                                            <Icon className="w-4 h-4" />
                                                            <span className="text-sm">{place}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        {station.interchangeStations && (
                                            <div className="space-y-2">
                                                <h3>Interchange Stations</h3>
                                                <div className="grid md:grid-cols-4 gap-4 mt-2">
                                                    {station.interchangeStations.map((intStationId) => {
                                                        const intStation = getStation(intStationId);
                                                        const line = getLineByStation(intStationId);

                                                        return intStation && line && (
                                                            <div key={intStation.id} className={`flex items-center space-x-2 ${line.color} bg-opacity-50 px-5 py-2 rounded-lg`}>
                                                                <Train className="w-4 h-4" />
                                                                <span className="text-sm">{intStation.id} {intStation.name}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {station.connectingStations && (
                                            <div className="space-y-2">
                                                <h3>Connecting Stations</h3>
                                                <div className="grid md:grid-cols-4 gap-4 mt-2">
                                                    {station.connectingStations.map((intStationId) => {
                                                        const intStation = getStation(intStationId);
                                                        const line = getLineByStation(intStationId);

                                                        return intStation && line && (
                                                            <div key={intStation.id} className={`flex items-center space-x-2 ${line.color} bg-opacity-50 px-5 py-2 rounded-lg`}>
                                                                <Train className="w-4 h-4" />
                                                                <span className="text-sm">{intStation.id} {intStation.name}</span>
                                                            </div>
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
                <p className="text-xs mt-12">&copy; {new Date().getFullYear()} Zackry Rosli. All right reserved.</p>
            </TransitionWrapper>
        </main>
    );
}

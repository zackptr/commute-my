import { useEffect, useState } from 'react';
import type { Line, Station, Path } from '~/types/map';
import { MAP_BOUNDS, LINE_COLORS } from '~/types/map';
import { lines } from '~/lib/line';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type MapContainerProps = {
  selectedLine: Line | null;
  highlightedPath: Path | null;
  handleLineClick: (line: Line) => void;
  setMap: (map: any) => void;
};

export function MapContainer({ selectedLine, highlightedPath, handleLineClick, setMap }: MapContainerProps) {
  const [MapComponents, setMapComponents] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    async function loadMap() {
      try {
        const [L, { MapContainer, TileLayer, Polyline, Popup, CircleMarker, useMap }] = await Promise.all([
          import('leaflet'),
          import('react-leaflet')
        ]);
        
        await import('leaflet/dist/leaflet.css');

        // Fix for default marker icons in react-leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/marker-icon-2x.png',
          iconUrl: '/marker-icon.png',
          shadowUrl: '/marker-shadow.png',
        });

        // Create the map component
        const MapComponentsInner = () => {
          // Center of KL (roughly KLCC area)
          const center = [3.1577, 101.7114];
          
          // Map setter component
          const MapSetter = () => {
            const map = useMap();
            useEffect(() => {
              setMap(map);
              
              // Set minimum zoom to show the entire KL/Selangor area
              map.setMinZoom(9);
              // Set maximum zoom for street level detail
              map.setMaxZoom(16);
              
              // Ensure the map stays within bounds
              map.setMaxBounds(MAP_BOUNDS.KL_SELANGOR_BOUNDS);
            }, [map]);
            return null;
          };

          return (
            <MapContainer
              center={center as [number, number]}
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              maxBounds={MAP_BOUNDS.KL_SELANGOR_BOUNDS}
              maxBoundsViscosity={1.0}
              minZoom={9}
              bounds={MAP_BOUNDS.KL_SELANGOR_BOUNDS}
            >
              <MapSetter />
              <TileLayer
                attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                tileSize={512}
                zoomOffset={-1}
                minZoom={9}
                maxZoom={16}
                bounds={MAP_BOUNDS.VISIBLE_BOUNDS}
                className="map-tiles-light"
              />
              
              <MapLines 
                selectedLine={selectedLine}
                highlightedPath={highlightedPath}
                handleLineClick={handleLineClick}
                Polyline={Polyline}
                CircleMarker={CircleMarker}
                Popup={Popup}
              />
            </MapContainer>
          );
        };

        setMapComponents(() => MapComponentsInner);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    }

    loadMap();
  }, [selectedLine, highlightedPath, handleLineClick, setMap]);

  if (!MapComponents) {
    return <div className="w-full h-screen flex items-center justify-center">Loading map...</div>;
  }

  return <MapComponents />;
}

type MapLinesProps = {
  selectedLine: Line | null;
  highlightedPath: Path | null;
  handleLineClick: (line: Line) => void;
  Polyline: any;
  CircleMarker: any;
  Popup: any;
};

function MapLines({ selectedLine, highlightedPath, handleLineClick, Polyline, CircleMarker, Popup }: MapLinesProps) {
  return (
    <>
      {lines.map((line: Line) => {
        const coordinates = line.stations.map((station) => [
          station.lat,
          station.lng,
        ] as [number, number]);

        const isSelected = selectedLine?.id === line.id;
        const isHighlighted = highlightedPath?.lines.some(l => l.line.id === line.id);
        
        // Get highlighted stations for this line
        const highlightedStations = highlightedPath?.lines
          .find(l => l.line.id === line.id)?.stations || [];

        // Split the line into segments based on highlighted path
        const segments: Array<typeof coordinates> = [];
        let currentSegment: typeof coordinates = [];

        line.stations.forEach((station, index) => {
          const isHighlightedStation = highlightedStations.some(s => s.id === station.id);
          const coord: [number, number] = [station.lat, station.lng];

          if (isHighlightedStation) {
            currentSegment.push(coord);
          } else if (currentSegment.length > 0) {
            segments.push([...currentSegment]);
            currentSegment = [];
          }

          // Handle last segment
          if (index === line.stations.length - 1 && currentSegment.length > 0) {
            segments.push([...currentSegment]);
          }
        });

        return (
          <div key={line.id}>
            {/* Regular line */}
            <Polyline
              positions={coordinates}
              pathOptions={{
                color: LINE_COLORS[line.color] || '#000000',
                weight: isSelected ? 5 : 3,
                opacity: isHighlighted ? 0.3 : (isSelected ? 1 : 0.7),
              }}
              eventHandlers={{
                click: () => handleLineClick(line)
              }}
            />

            {/* Highlighted segments */}
            {isHighlighted && segments.map((segment, index) => (
              <Polyline
                key={index}
                positions={segment}
                pathOptions={{
                  color: LINE_COLORS[line.color] || '#000000',
                  weight: 5,
                  opacity: 1,
                }}
              />
            ))}

            {/* Stations */}
            {line.stations.map((station) => {
              const isHighlightedStation = highlightedStations.some(s => s.id === station.id);
              return (
                <CircleMarker
                  key={station.id}
                  center={[station.lat, station.lng]}
                  radius={isHighlightedStation ? 8 : 6}
                  pathOptions={{
                    color: LINE_COLORS[line.color] || '#000000',
                    fillColor: '#FFFFFF',
                    fillOpacity: 1,
                    weight: isHighlightedStation ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => handleLineClick(line)
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{station.name}</strong>
                      <br />
                      {station.nearby && (
                        <div className="mt-1">
                          <strong>Nearby:</strong>
                          <ul className="list-disc list-inside">
                            {station.nearby.map((place, index) => (
                              <li key={index}>{place}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {(station.interchangeStations || station.connectingStations) && (
                        <div className="mt-1">
                          <strong>Connections:</strong>
                          <ul className="list-disc list-inside">
                            {station.interchangeStations?.map((id) => (
                              <li key={id}>Interchange: {id}</li>
                            ))}
                            {station.connectingStations?.map((id) => (
                              <li key={id}>Connection: {id}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </div>
        );
      })}
    </>
  );
} 
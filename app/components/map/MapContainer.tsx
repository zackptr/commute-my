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
  fromStation?: Station | null;
  toStation?: Station | null;
};

export function MapContainer({ 
  selectedLine, 
  highlightedPath, 
  handleLineClick, 
  setMap,
  fromStation,
  toStation 
}: MapContainerProps) {
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
                fromStation={fromStation}
                toStation={toStation}
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
  }, [selectedLine, highlightedPath, handleLineClick, setMap, fromStation, toStation]);

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
  fromStation?: Station | null;
  toStation?: Station | null;
};

function MapLines({ 
  selectedLine, 
  highlightedPath, 
  handleLineClick, 
  Polyline, 
  CircleMarker, 
  Popup,
  fromStation,
  toStation 
}: MapLinesProps) {
  return (
    <>
      {lines.map((line: Line) => {
        // Break down line into segments between stations
        const lineSegments = line.stations.slice(0, -1).map((station, index) => ({
          from: station,
          to: line.stations[index + 1],
          coordinates: [
            [station.lat, station.lng],
            [line.stations[index + 1].lat, line.stations[index + 1].lng]
          ] as [number, number][]
        }));

        const isSelected = selectedLine?.id === line.id;
        const isPathfinderMode = fromStation || toStation;
        
        // Get highlighted stations for this line
        const highlightedStations = highlightedPath?.lines
          .find(l => l.line.id === line.id)?.stations || [];

        // Check if segment should be shown
        const shouldShowSegment = (fromStation: Station, toStation: Station) => {
          if (!isPathfinderMode) return true;
          if (!highlightedPath) return false;

          // Find consecutive stations in the highlighted path
          const stationsInPath = highlightedPath.lines
            .find(l => l.line.id === line.id)?.stations || [];
          
          for (let i = 0; i < stationsInPath.length - 1; i++) {
            if (
              (stationsInPath[i].id === fromStation.id && stationsInPath[i + 1].id === toStation.id) ||
              (stationsInPath[i].id === toStation.id && stationsInPath[i + 1].id === fromStation.id)
            ) {
              return true;
            }
          }
          return false;
        };

        // Determine which stations to show
        const shouldShowStation = (station: Station) => {
          if (!isPathfinderMode) return true;
          if (station.id === fromStation?.id || station.id === toStation?.id) return true;
          return highlightedStations.some(s => s.id === station.id);
        };

        return (
          <div key={line.id}>
            {/* Line segments */}
            {lineSegments.map((segment, index) => {
              const shouldShow = shouldShowSegment(segment.from, segment.to);
              if (!shouldShow) return null;

              return (
                <Polyline
                  key={`${segment.from.id}-${segment.to.id}`}
                  positions={segment.coordinates}
                  pathOptions={{
                    color: LINE_COLORS[line.color] || '#000000',
                    weight: isSelected ? 5 : 3,
                    opacity: 1
                  }}
                  eventHandlers={{
                    click: () => handleLineClick(line)
                  }}
                />
              );
            })}

            {/* Stations */}
            {line.stations.map((station) => {
              if (!shouldShowStation(station)) return null;
              
              const isHighlightedStation = highlightedStations.some(s => s.id === station.id);
              const isFromStation = station.id === fromStation?.id;
              const isToStation = station.id === toStation?.id;
              
              return (
                <CircleMarker
                  key={station.id}
                  center={[station.lat, station.lng]}
                  radius={isFromStation || isToStation ? 8 : 6}
                  pathOptions={{
                    color: LINE_COLORS[line.color] || '#000000',
                    fillColor: '#FFFFFF',
                    fillOpacity: 1,
                    weight: isFromStation || isToStation ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => handleLineClick(line)
                  }}
                >
                  <Popup
                    closeButton={false}
                    offset={[0, -10]}
                    className="station-popup"
                  >
                    <div className="text-sm font-medium">
                      {station.name}
                      <span className="ml-2 text-gray-500">{station.id}</span>
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
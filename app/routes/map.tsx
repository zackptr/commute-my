import { useEffect, useState, useCallback } from 'react';
import { lines } from '~/lib/line';
import type { LatLngBoundsLiteral } from 'leaflet';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

// Add animation styles
const styles = {
  lineContent: `
    .animate-slideDown {
      animation: slideDown 0.2s ease-out;
    }
    
    .animate-slideUp {
      animation: slideUp 0.2s ease-out;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `
};

// Define the bounds for Selangor and KL
// Format: [southWest, northEast]
const KL_SELANGOR_BOUNDS: LatLngBoundsLiteral = [
  [2.8, 101.3], // Southwest coordinates
  [3.5, 101.9]  // Northeast coordinates
];

// Define a larger bounds for the visible map area (shows map tiles but restricts panning)
const VISIBLE_BOUNDS: LatLngBoundsLiteral = [
  [2.0, 100.5], // Southwest coordinates (wider area)
  [4.3, 102.7]  // Northeast coordinates (wider area)
];

export default function MapPage() {
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<React.ComponentType | null>(null);
  const [selectedLine, setSelectedLine] = useState<typeof lines[0] | null>(null);
  const [map, setMap] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'search' | 'lines' | 'pathfinder'>('search');
  const [fromStation, setFromStation] = useState<(typeof allStations)[0] | null>(null);
  const [toStation, setToStation] = useState<(typeof allStations)[0] | null>(null);
  const [selectingFor, setSelectingFor] = useState<'from' | 'to' | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{
    lines: Array<{
      line: typeof lines[0];
      stations: typeof lines[0]['stations'];
    }>;
  } | null>(null);
  const [expandedLines, setExpandedLines] = useState<Record<string, boolean>>({});

  // Get all stations from all lines
  const allStations = lines.flatMap(line => 
    line.stations.map(station => ({
      ...station,
      lineName: line.name,
      lineId: line.id,
      lineColor: line.color,
      lineType: line.type
    }))
  );

  // Filter stations based on search query
  const filteredStations = searchQuery
    ? allStations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Group stations by line
  const stationsByLine = lines.map(line => ({
    ...line,
    stations: line.stations
  }));

  // Function to find the shortest path between two stations
  const findPath = useCallback((from: typeof fromStation, to: typeof toStation) => {
    if (!from || !to) return null;

    // Helper function to find connecting stations between two lines
    const findConnections = (line1: typeof lines[0], line2: typeof lines[0]) => {
      const connections: Array<{
        station1: typeof line1['stations'][0];
        station2: typeof line2['stations'][0];
      }> = [];

      line1.stations.forEach(station1 => {
        if (station1.interchangeStations) {
          station1.interchangeStations.forEach(id => {
            const station2 = line2.stations.find(s => s.id === id);
            if (station2) {
              connections.push({ station1, station2 });
            }
          });
        }
      });

      return connections;
    };

    const fromLine = lines.find(l => l.id === from.lineId);
    const toLine = lines.find(l => l.id === to.lineId);

    if (!fromLine || !toLine) return null;

    // If on the same line
    if (fromLine.id === toLine.id) {
      const stations = fromLine.stations;
      const fromIndex = stations.findIndex(s => s.id === from.id);
      const toIndex = stations.findIndex(s => s.id === to.id);
      
      if (fromIndex !== -1 && toIndex !== -1) {
        const path = stations.slice(
          Math.min(fromIndex, toIndex),
          Math.max(fromIndex, toIndex) + 1
        );
        
        return {
          lines: [{
            line: fromLine,
            stations: path
          }]
        };
      }
    }

    // If on different lines, find connecting stations
    const connections = findConnections(fromLine, toLine);
    
    if (connections.length > 0) {
      // Use the first connection found (can be improved with actual shortest path algorithm)
      const connection = connections[0];
      
      // Get path from origin to interchange
      const fromStations = fromLine.stations;
      const fromIndex = fromStations.findIndex(s => s.id === from.id);
      const interchangeIndex1 = fromStations.findIndex(s => s.id === connection.station1.id);
      
      const path1 = fromStations.slice(
        Math.min(fromIndex, interchangeIndex1),
        Math.max(fromIndex, interchangeIndex1) + 1
      );

      // Get path from interchange to destination
      const toStations = toLine.stations;
      const interchangeIndex2 = toStations.findIndex(s => s.id === connection.station2.id);
      const toIndex = toStations.findIndex(s => s.id === to.id);
      
      const path2 = toStations.slice(
        Math.min(interchangeIndex2, toIndex),
        Math.max(interchangeIndex2, toIndex) + 1
      );

      return {
        lines: [
          {
            line: fromLine,
            stations: path1
          },
          {
            line: toLine,
            stations: path2
          }
        ]
      };
    }

    return null;
  }, []);

  // Update highlighted path when stations change
  useEffect(() => {
    if (fromStation && toStation) {
      const path = findPath(fromStation, toStation);
      setHighlightedPath(path);
    } else {
      setHighlightedPath(null);
    }
  }, [fromStation, toStation, findPath]);

  const handleZoomIn = useCallback(() => {
    if (map) map.zoomIn();
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) map.zoomOut();
  }, [map]);

  const handleLineClick = useCallback((line: typeof lines[0]) => {
    setSelectedLine(prev => prev?.id === line.id ? null : line);
  }, []);

  // Handle station selection for pathfinder
  const handleStationSelect = useCallback((station: typeof allStations[0]) => {
    if (selectingFor === 'from') {
      setFromStation(station);
      setSelectingFor(null);
      setSelectedView('pathfinder');
    } else if (selectingFor === 'to') {
      setToStation(station);
      setSelectingFor(null);
      setSelectedView('pathfinder');
    }
    setSearchQuery('');
  }, [selectingFor]);

  // Toggle line expansion
  const toggleLineExpansion = useCallback((lineId: string) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineId]: !prev[lineId]
    }));
  }, []);

  useEffect(() => {
    async function loadMap() {
      try {
        const [L, { MapContainer, TileLayer, Polyline, Popup, Marker, CircleMarker, useMap }] = await Promise.all([
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
          
          // Line colors mapping
          const lineColors = {
            'bg-lrt-ag': '#FF0000', // Ampang Line - Red
            'bg-lrt-sp': '#FF0000', // Sri Petaling Line - Red (same as Ampang)
            'bg-lrt-kj': '#800080', // Kelana Jaya Line - Purple
            'bg-mr-kl': '#FFA500', // Monorail - Orange
            'bg-mrt-kg': '#00FF00', // Kajang Line - Green
            'bg-mrt-py': '#0000FF', // Putrajaya Line - Blue
          };

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
              map.setMaxBounds(KL_SELANGOR_BOUNDS);
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
              maxBounds={KL_SELANGOR_BOUNDS}
              maxBoundsViscosity={1.0}
              minZoom={9}
              bounds={KL_SELANGOR_BOUNDS}
            >
              <MapSetter />
              <TileLayer
                attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                tileSize={512}
                zoomOffset={-1}
                minZoom={9}
                maxZoom={16}
                bounds={VISIBLE_BOUNDS}
                className="map-tiles-light"
              />
              
              {lines.map((line) => {
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
                        color: lineColors[line.color as keyof typeof lineColors] || '#000000',
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
                          color: lineColors[line.color as keyof typeof lineColors] || '#000000',
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
                            color: lineColors[line.color as keyof typeof lineColors] || '#000000',
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
            </MapContainer>
          );
        };

        setMapComponents(() => MapComponentsInner);
        setIsClient(true);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    }

    loadMap();
  }, [handleLineClick]);

  if (!isClient || !MapComponents) {
    return <div className="w-full h-screen flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full h-screen flex">
      <style>{styles.lineContent}</style>
      {/* Search and Navigation Panel */}
      <div className="w-96 bg-[#18181B] text-white shadow-lg overflow-y-auto border-r border-[#27272A]">
        {/* Search Header */}
        <div className="p-4 border-b border-[#27272A]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for station..."
              className="w-full bg-[#27272A] text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          
          {/* View Toggle */}
          <div className="flex mt-4 bg-[#27272A] rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                selectedView === 'search' ? 'bg-[#3F3F46] text-white' : 'text-gray-400'
              }`}
              onClick={() => setSelectedView('search')}
            >
              Search
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                selectedView === 'lines' ? 'bg-[#3F3F46] text-white' : 'text-gray-400'
              }`}
              onClick={() => setSelectedView('lines')}
            >
              Lines
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                selectedView === 'pathfinder' ? 'bg-[#3F3F46] text-white' : 'text-gray-400'
              }`}
              onClick={() => setSelectedView('pathfinder')}
            >
              Route
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto">
          {selectedView === 'pathfinder' ? (
            <div className="p-4 space-y-4">
              {/* From Station */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">From Station</label>
                <div 
                  className={`p-3 rounded-lg cursor-pointer ${
                    fromStation ? 'bg-[#27272A]' : 'border-2 border-dashed border-[#27272A]'
                  }`}
                  onClick={() => {
                    setSelectingFor('from');
                    setSelectedView('search');
                    setSearchQuery('');
                  }}
                >
                  {fromStation ? (
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: fromStation.lineColor === 'bg-lrt-ag' ? '#FF0000' :
                                         fromStation.lineColor === 'bg-lrt-sp' ? '#FF0000' :
                                         fromStation.lineColor === 'bg-lrt-kj' ? '#800080' :
                                         fromStation.lineColor === 'bg-mr-kl' ? '#FFA500' :
                                         fromStation.lineColor === 'bg-mrt-kg' ? '#00FF00' :
                                         fromStation.lineColor === 'bg-mrt-py' ? '#0000FF' : '#000000'
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center">
                          <span className="text-xs font-medium">{fromStation.id}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{fromStation.name}</div>
                        <div className="text-sm text-gray-400">
                          {fromStation.lineType} {fromStation.lineName} Line
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-2">
                      Select starting station
                    </div>
                  )}
                </div>
              </div>

              {/* To Station */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">To Station</label>
                <div 
                  className={`p-3 rounded-lg cursor-pointer ${
                    toStation ? 'bg-[#27272A]' : 'border-2 border-dashed border-[#27272A]'
                  }`}
                  onClick={() => {
                    setSelectingFor('to');
                    setSelectedView('search');
                    setSearchQuery('');
                  }}
                >
                  {toStation ? (
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: toStation.lineColor === 'bg-lrt-ag' ? '#FF0000' :
                                         toStation.lineColor === 'bg-lrt-sp' ? '#FF0000' :
                                         toStation.lineColor === 'bg-lrt-kj' ? '#800080' :
                                         toStation.lineColor === 'bg-mr-kl' ? '#FFA500' :
                                         toStation.lineColor === 'bg-mrt-kg' ? '#00FF00' :
                                         toStation.lineColor === 'bg-mrt-py' ? '#0000FF' : '#000000'
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center">
                          <span className="text-xs font-medium">{toStation.id}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{toStation.name}</div>
                        <div className="text-sm text-gray-400">
                          {toStation.lineType} {toStation.lineName} Line
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-2">
                      Select destination station
                    </div>
                  )}
                </div>
              </div>

              {/* Route Details */}
              {fromStation && toStation && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4">Route Details</h3>
                  {(() => {
                    const path = findPath(fromStation, toStation);
                    if (path) {
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{
                                backgroundColor: path.lines[0].line.color === 'bg-lrt-ag' ? '#FF0000' :
                                               path.lines[0].line.color === 'bg-lrt-sp' ? '#FF0000' :
                                               path.lines[0].line.color === 'bg-lrt-kj' ? '#800080' :
                                               path.lines[0].line.color === 'bg-mr-kl' ? '#FFA500' :
                                               path.lines[0].line.color === 'bg-mrt-kg' ? '#00FF00' :
                                               path.lines[0].line.color === 'bg-mrt-py' ? '#0000FF' : '#000000'
                              }}
                            />
                            <span className="font-medium">
                              {path.lines[0].line.type} {path.lines[0].line.name} Line
                            </span>
                          </div>
                          <div className="space-y-2 ml-6">
                            {path.lines[0].stations.map((station, index) => (
                              <div key={station.id} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-400">
                                  {station.id}
                                </span>
                                <span className="text-sm">{station.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="text-center text-gray-400 py-4">
                        Route planning between different lines coming soon!
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : selectedView === 'search' ? (
            <div className="p-4 space-y-4">
              {searchQuery ? (
                filteredStations.length > 0 ? (
                  filteredStations.map((station) => (
                    <div
                      key={station.id}
                      className="flex items-center gap-3 p-3 bg-[#27272A] rounded-lg cursor-pointer hover:bg-[#3F3F46]"
                      onClick={() => {
                        if (selectingFor) {
                          handleStationSelect(station);
                        } else {
                          const line = lines.find(l => l.id === station.lineId);
                          if (line) {
                            setSelectedLine(line);
                            map?.setView([station.lat, station.lng], 15);
                          }
                        }
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: station.lineColor === 'bg-lrt-ag' ? '#FF0000' :
                                         station.lineColor === 'bg-lrt-sp' ? '#FF0000' :
                                         station.lineColor === 'bg-lrt-kj' ? '#800080' :
                                         station.lineColor === 'bg-mr-kl' ? '#FFA500' :
                                         station.lineColor === 'bg-mrt-kg' ? '#00FF00' :
                                         station.lineColor === 'bg-mrt-py' ? '#0000FF' : '#000000'
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center">
                          <span className="text-xs font-medium">{station.id}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{station.name}</div>
                        <div className="text-sm text-gray-400">{station.lineType} {station.lineName} Line</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    No stations found
                  </div>
                )
              ) : (
                <div className="text-center text-gray-400 py-8">
                  {selectingFor ? 'Select a station' : 'Type to search for stations'}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {stationsByLine.map((line) => (
                <div key={line.id}>
                  <div 
                    className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-[#27272A] p-2 rounded-lg"
                    onClick={() => toggleLineExpansion(line.id)}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{
                          backgroundColor: line.color === 'bg-lrt-ag' ? '#FF0000' :
                                         line.color === 'bg-lrt-sp' ? '#FF0000' :
                                         line.color === 'bg-lrt-kj' ? '#800080' :
                                         line.color === 'bg-mr-kl' ? '#FFA500' :
                                         line.color === 'bg-mrt-kg' ? '#00FF00' :
                                         line.color === 'bg-mrt-py' ? '#0000FF' : '#000000'
                        }}
                      />
                      <h3 className="font-bold flex-1">{line.type} {line.name} Line</h3>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transform transition-transform ${expandedLines[line.id] ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {expandedLines[line.id] && (
                    <div className="space-y-2 ml-6 animate-slideDown">
                      {line.stations.map((station) => (
                        <div
                          key={station.id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-[#27272A] cursor-pointer"
                          onClick={() => {
                            setSelectedLine(line);
                            map?.setView([station.lat, station.lng], 15);
                          }}
                        >
                          <span className="text-sm font-medium text-gray-400">{station.id}</span>
                          <span className="text-sm">{station.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <MapComponents />
        {/* Zoom controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg">
          <button 
            className="p-2 hover:bg-gray-100 border-b border-gray-200 w-10 h-10 flex items-center justify-center"
            onClick={handleZoomIn}
          >
            +
          </button>
          <button 
            className="p-2 hover:bg-gray-100 w-10 h-10 flex items-center justify-center"
            onClick={handleZoomOut}
          >
            -
          </button>
        </div>
      </div>

      {/* Route visualization panel */}
      <div className="w-96 bg-[#18181B] text-white shadow-lg overflow-y-auto">
        {selectedLine ? (
          <div>
            {/* Back button */}
            <div className="p-4 flex items-center gap-2 border-b border-[#27272A]">
              <button className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>Back</span>
              </button>
            </div>

            {/* Line name */}
            <div className="p-4">
              <h2 className="text-2xl font-bold">{selectedLine.name} Line</h2>
            </div>

            {/* Stations list */}
            <div className="space-y-8 pb-8">
              {selectedLine.stations.map((station) => (
                <div key={station.id} className="flex items-start px-4">
                  <div className="flex flex-col items-center mr-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: selectedLine.color === 'bg-lrt-ag' ? '#FF0000' :
                                       selectedLine.color === 'bg-lrt-sp' ? '#FF0000' :
                                       selectedLine.color === 'bg-lrt-kj' ? '#800080' :
                                       selectedLine.color === 'bg-mr-kl' ? '#FFA500' :
                                       selectedLine.color === 'bg-mrt-kg' ? '#00FF00' :
                                       selectedLine.color === 'bg-mrt-py' ? '#0000FF' : '#000000'
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#18181B] flex items-center justify-center">
                        <span className="text-sm font-medium">{station.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">{station.name}</h3>
                      <span className="text-gray-400">{station.id}</span>
                    </div>
                    
                    {/* Interchange Stations Section */}
                    {station.interchangeStations && station.interchangeStations.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 1l4 4-4 4"/>
                            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                            <path d="M7 23l-4-4 4-4"/>
                            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                          </svg>
                          <span>Interchange Stations</span>
                        </div>
                        <div className="space-y-2">
                          {station.interchangeStations.map(id => {
                            const interchangeLine = lines.find(l => l.stations.some(s => s.id === id));
                            const interchangeStation = interchangeLine?.stations.find(s => s.id === id);
                            if (!interchangeLine || !interchangeStation) return null;
                            return (
                              <div 
                                key={id}
                                className="flex items-center gap-2 bg-[#27272A] p-3 rounded-lg"
                              >
                                <div 
                                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                                  style={{
                                    backgroundColor: interchangeLine.color === 'bg-lrt-ag' ? '#FF0000' :
                                                   interchangeLine.color === 'bg-lrt-sp' ? '#FF0000' :
                                                   interchangeLine.color === 'bg-lrt-kj' ? '#800080' :
                                                   interchangeLine.color === 'bg-mr-kl' ? '#FFA500' :
                                                   interchangeLine.color === 'bg-mrt-kg' ? '#00FF00' :
                                                   interchangeLine.color === 'bg-mrt-py' ? '#0000FF' : '#000000'
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="3" width="16" height="16" rx="2"/>
                                    <path d="M4 11h16"/>
                                    <path d="M12 3v16"/>
                                  </svg>
                                </div>
                                <span className="font-medium">
                                  {interchangeLine.type} {interchangeStation.name} {id}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Nearby Section */}
                    {station.nearby && station.nearby.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>Nearby Highlights</span>
                        </div>
                        <div className="space-y-2">
                          {station.nearby.map((place, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-2 bg-[#27272A] p-3 rounded-lg"
                            >
                              <div className="w-6 h-6 rounded bg-[#3F3F46] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                                  <path d="M9 22v-4h6v4"/>
                                  <path d="M8 6h.01"/>
                                  <path d="M16 6h.01"/>
                                  <path d="M12 6h.01"/>
                                  <path d="M12 10h.01"/>
                                  <path d="M12 14h.01"/>
                                  <path d="M16 10h.01"/>
                                  <path d="M16 14h.01"/>
                                  <path d="M8 10h.01"/>
                                  <path d="M8 14h.01"/>
                                </svg>
                              </div>
                              <span className="font-medium">{place}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400">
            Select a line to view its route
          </div>
        )}
      </div>
    </div>
  );
} 
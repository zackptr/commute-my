import { useState, useEffect, useCallback } from 'react';
import { useMap } from '~/hooks/useMap';
import { MapContainer } from '~/components/map/MapContainer';
import { ZoomControls } from '~/components/map/ZoomControls';
import { SearchHeader } from '~/components/sidebar/SearchHeader';
import { SearchPanel } from '~/components/sidebar/SearchPanel';
import { LinesPanel } from '~/components/sidebar/LinesPanel';
import { PathfinderPanel } from '~/components/sidebar/PathfinderPanel';
import { LineDetailsPanel } from '~/components/panels/LineDetailsPanel';
import type { ViewType } from '~/types/map';
import { lines } from '~/lib/line';
import { Link } from 'react-router';
import type { Route } from './+types/map';


export function meta({}: Route.MetaArgs) {
  return [
      { title: "Commute - Interactive Map" },
      { description: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
      { property: "og:title", content: "Commute - Interactive Map" },  
      { property: "og:description", content: "A project aims to make public transportation in the Klang Valley more accessible to everyone, including tourists." },
  ];
}
// Add animation styles
const styles = {
  lineContent: `
    @import url('https://fonts.googleapis.com/css2?family=Open Sans:wght@400;500;600;700&display=swap');

    * {
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
    }

    .leaflet-container {
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
    }

    .leaflet-popup-content {
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
    }

    /* Timeline styles */
    .timeline-line {
      position: absolute;
      left: 44px;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #F97316;
      z-index: 0;
    }

    .timeline-station {
      position: relative;
      padding-left: 60px;
      margin-bottom: 24px;
      z-index: 1;
    }

    .timeline-station:last-child {
      margin-bottom: 0;
    }

    .timeline-station-icon {
      position: absolute;
      left: 16px;
      top: 0;
      width: 36px;
      height: 36px;
      background-color: #F97316;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .timeline-station-icon svg {
      width: 24px;
      height: 24px;
      color: white;
      stroke-width: 2;
    }

    .timeline-station-content {
      background-color: transparent;
      border-radius: 8px;
      padding: 2px 0;
    }

    .timeline-station-name {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 6px;
    }

    .timeline-section {
      margin-top: 8px;
    }

    .timeline-section-title {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6B7280;
      margin-bottom: 6px;
    }

    .timeline-section-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timeline-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background-color: rgba(107, 114, 128, 0.1);
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }

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

    .glass-panel {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    
    .glass-panel-tab {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    /* Station popup styles */
    .station-popup .leaflet-popup-content-wrapper {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .station-popup .leaflet-popup-tip {
      background: rgba(255, 255, 255, 0.95);
    }

    .station-popup .leaflet-popup-content {
      margin: 8px 12px;
      line-height: 1.4;
    }
  `
};

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<ViewType>('lines');
  const [selectingFor, setSelectingFor] = useState<'from' | 'to' | null>(null);
  const [expandedLines, setExpandedLines] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [leafletModules, setLeafletModules] = useState<any>(null);

  const {
    selectedLine,
    setSelectedLine,
    fromStation,
    setFromStation,
    toStation,
    setToStation,
    highlightedPath,
    allStations,
    stationsByLine,
    handleZoomIn,
    handleZoomOut,
    handleLineClick,
    findPath
  } = useMap();

  useEffect(() => {
    async function loadLeaflet() {
      if (typeof window === 'undefined') return;
      
      const [L, reactLeaflet] = await Promise.all([
        import('leaflet'),
        import('react-leaflet')
      ]);
      
      await import('leaflet/dist/leaflet.css');
      
      setLeafletModules({
        L: L.default,
        TileLayer: reactLeaflet.TileLayer,
        Marker: reactLeaflet.Marker
      });
      setMounted(true);
    }
    
    loadLeaflet();
  }, []);

  // Filter stations based on search query
  const filteredStations = searchQuery
    ? allStations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle station selection for pathfinder
  const handleStationSelect = (station: typeof allStations[0]) => {
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
  };

  // Toggle line expansion
  const toggleLineExpansion = (lineId: string) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineId]: !prev[lineId]
    }));
  };

  const handleLocationClick = useCallback(() => {
    if (!map) return;
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          map.setView([latitude, longitude], 15);
        },
        (error) => {
          console.error("Error getting location:", error);
          // You might want to show a toast/notification here
        }
      );
    }
  }, [map]);

  return (
    <div className="w-full h-screen relative">
      <style>{styles.lineContent}</style>
      
      {/* Map Container - Higher z-index for tooltips */}
      {mounted && leafletModules && (
        <>
          <div className="absolute inset-0 z-[5]" onClick={() => {
            if (window.innerWidth < 768) { // Only on mobile
              setIsPanelExpanded(false);
              setSearchQuery('');
              setIsSearchOpen(false);
            }
          }}>
            <MapContainer
              selectedLine={selectedLine}
              highlightedPath={highlightedPath}
              handleLineClick={handleLineClick}
              setMap={setMap}
              fromStation={fromStation}
              toStation={toStation}
            >
              {/* User location marker */}
              {userLocation && (
                <leafletModules.Marker 
                  position={userLocation}
                  icon={leafletModules.L.divIcon({
                    className: 'relative',
                    html: `
                      <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div class="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse"></div>
                    `,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                  })}
                />
              )}
            </MapContainer>
          </div>
          
          {/* Zoom Controls - Separate from map container for proper z-indexing */}
          <ZoomControls
            onZoomIn={() => map?.zoomIn()}
            onZoomOut={() => map?.zoomOut()}
            onLocationClick={handleLocationClick}
          />
        </>
      )}

      {/* Mobile Search Bar - Always visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden pointer-events-auto z-[25]">
        <div className="relative" onClick={e => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Search for bus service or stop"
            className="w-full h-12 bg-white/95 backdrop-blur-md text-gray-900 placeholder-gray-500 rounded-lg px-4 py-2 pl-10 pr-16 shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsSearchOpen(true);
              setIsPanelExpanded(true);
            }}
          />
          <svg
            className="absolute left-3 top-3.5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
          {searchQuery && (
            <button
              className="absolute right-3 top-3 text-blue-500 font-medium"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Panels Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Panel */}
        <div 
          className={`absolute left-0 bottom-0 w-full md:w-[400px] ${
            isPanelExpanded ? 'h-[85vh]' : searchQuery ? 'h-[70vh]' : 'h-[0vh]'
          } md:h-screen glass-panel backdrop-blur-md shadow-lg overflow-hidden border-r border-gray-200 pointer-events-auto z-[15] transition-all duration-300 ease-in-out rounded-t-xl md:rounded-none`}
          onClick={e => e.stopPropagation()}
        >
          {/* Mobile Panel Header */}
          <div className="md:hidden px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : 'Train Lines'}
              </h2>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  setIsPanelExpanded(false);
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>
          </div>

          {/* Desktop Search Header */}
          <div className="hidden md:block">
            <SearchHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchOpen={setIsSearchOpen}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
          </div>

          <div className={`overflow-y-auto ${
            isPanelExpanded ? 'h-[calc(85vh-100px)]' : 'h-[calc(70vh-100px)]'
          } md:h-[calc(100vh-110px)]`}>
            {searchQuery ? (
              <SearchPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredStations={filteredStations}
                selectingFor={selectingFor}
                handleStationSelect={handleStationSelect}
                map={map}
                setSelectedLine={setSelectedLine}
                lines={lines}
              />
            ) : selectedView === 'pathfinder' ? (
              <PathfinderPanel
                fromStation={fromStation}
                toStation={toStation}
                setSelectingFor={setSelectingFor}
                setSelectedView={setSelectedView}
                setSearchQuery={setSearchQuery}
                findPath={findPath}
                setFromStation={setFromStation}
                setToStation={setToStation}
              />
            ) : (
              <LinesPanel
                stationsByLine={stationsByLine}
                expandedLines={expandedLines}
                toggleLineExpansion={toggleLineExpansion}
                setSelectedLine={setSelectedLine}
                map={map}
                searchQuery={searchQuery}
                filteredStations={filteredStations}
                handleStationSelect={handleStationSelect}
                selectingFor={selectingFor}
                lines={lines}
              />
            )}
          </div>
        </div>

        {/* Right Panel */}
        {(selectedLine || fromStation || toStation) && (
          <div 
            className={`absolute right-0 bottom-16 md:bottom-0 w-full md:w-[340px] pointer-events-auto z-[15] p-4 transform transition-transform duration-300 ${
              isPanelExpanded ? 'translate-y-full md:translate-y-0' : 'translate-y-0'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <LineDetailsPanel
              selectedLine={selectedLine}
              onBack={() => {
                setSelectedLine(null);
                setFromStation(null);
                setToStation(null);
              }}
              fromStation={fromStation}
              toStation={toStation}
              highlightedPath={highlightedPath}
            />
          </div>
        )}
      </div>

      {/* Mobile Toggle Button - Only show when not searching */}
      {!searchQuery && (
        <button 
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 z-20 md:hidden pointer-events-auto flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsPanelExpanded(prev => !prev);
          }}
        >
          <span className="text-sm font-medium text-gray-600">
            {isPanelExpanded ? 'Hide Lines' : 'Show Lines'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#000" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transform transition-transform ${isPanelExpanded ? 'rotate-180' : ''}`}
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
} 
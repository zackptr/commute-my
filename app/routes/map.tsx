import { useState, useEffect } from 'react';
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

  const {
    map,
    setMap,
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
    setMounted(true);
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

  return (
    <div className="w-full h-screen relative">
      <style>{styles.lineContent}</style>
      
      {/* Map Container - Higher z-index for tooltips */}
      {mounted && (
        <div className="absolute inset-0 z-[5]">
          <MapContainer
            selectedLine={selectedLine}
            highlightedPath={highlightedPath}
            handleLineClick={handleLineClick}
            setMap={setMap}
            fromStation={fromStation}
            toStation={toStation}
          />
          <ZoomControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      )}

      {/* Panels Container - Lower z-index for base panels, but higher for actual content */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Panel - Higher z-index than map base but lower than tooltips */}
        <div className="absolute left-0 bottom-0 w-[400px] h-screen glass-panel shadow-lg overflow-hidden border-r border-gray-200 pointer-events-auto z-[15]">
          <SearchHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsSearchOpen={setIsSearchOpen}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />

          <div className="overflow-y-auto h-[calc(100vh-110px)]">
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
          <div className="absolute right-0 bottom-0 w-[340px] pointer-events-auto z-[15] pr-1 ">
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
    </div>
  );
} 
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

    .glass-panel {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    
    .glass-panel-tab {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  `
};

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<ViewType>('search');
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

  const renderSidePanels = () => (
    <>
      {/* Left Panel */}
      <div className="w-[400px] glass-panel shadow-lg overflow-hidden border-r border-gray-200">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSearchOpen={setIsSearchOpen}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />

        <div className="overflow-y-auto  h-[calc(100vh-110px)]">
          {selectedView === 'pathfinder' ? (
            <PathfinderPanel
              fromStation={fromStation}
              toStation={toStation}
              setSelectingFor={setSelectingFor}
              setSelectedView={setSelectedView}
              setSearchQuery={setSearchQuery}
              findPath={findPath}
            />
          ) : selectedView === 'search' ? (
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
          ) : (
            <LinesPanel
              stationsByLine={stationsByLine}
              expandedLines={expandedLines}
              toggleLineExpansion={toggleLineExpansion}
              setSelectedLine={setSelectedLine}
              map={map}
            />
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Panel */}
      {(selectedLine || fromStation || toStation) && (
        <div className="w-[320px] glass-panel shadow-lg overflow-hidden border-l border-gray-200 pointer-events-auto relative z-[15]">
          <LineDetailsPanel
            selectedLine={selectedLine}
            onBack={() => setSelectedLine(null)}
          />
        </div>
      )}
    </>
  );

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
          />
          <ZoomControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      )}

      {/* Panels Container - Lower z-index for base panels, but higher for actual content */}
      <div className="relative w-full h-full flex pointer-events-none">
        {/* Left Panel - Higher z-index than map base but lower than tooltips */}
        <div className="w-[400px] glass-panel shadow-lg overflow-hidden border-r border-gray-200 pointer-events-auto relative z-[15]">
          <SearchHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsSearchOpen={setIsSearchOpen}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />

          <div className="overflow-y-auto h-[calc(100vh-110px)]">
            {selectedView === 'pathfinder' ? (
              <PathfinderPanel
                fromStation={fromStation}
                toStation={toStation}
                setSelectingFor={setSelectingFor}
                setSelectedView={setSelectedView}
                setSearchQuery={setSearchQuery}
                findPath={findPath}
              />
            ) : selectedView === 'search' ? (
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
            ) : (
              <LinesPanel
                stationsByLine={stationsByLine}
                expandedLines={expandedLines}
                toggleLineExpansion={toggleLineExpansion}
                setSelectedLine={setSelectedLine}
                map={map}
              />
            )}
          </div>
        </div>

        {/* Spacer - Allow map interactions */}
        <div className="flex-1 pointer-events-none" />

        {/* Right Panel */}
        {(selectedLine || fromStation || toStation) && (
          <div className="w-[320px] glass-panel shadow-lg overflow-hidden border-l border-gray-200 pointer-events-auto relative z-[15]">
            <LineDetailsPanel
              selectedLine={selectedLine}
              onBack={() => setSelectedLine(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
} 
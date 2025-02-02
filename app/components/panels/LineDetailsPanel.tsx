import type { Line, Station, Path } from '~/types/map';
import { LINE_COLORS } from '~/types/map';
import { lines } from '~/lib/line';
import { Train } from 'lucide-react';

type LineDetailsPanelProps = {
  selectedLine: Line | null;
  onBack: () => void;
  fromStation?: Station | null;
  toStation?: Station | null;
  highlightedPath?: Path | null;
};

export function LineDetailsPanel({ 
  selectedLine, 
  onBack,
  fromStation,
  toStation,
  highlightedPath
}: LineDetailsPanelProps) {
  const isPathfinderMode = fromStation || toStation;
  const lineColor = selectedLine ? LINE_COLORS[selectedLine.color] || '#F97316' : '#F97316';

  return (
    <div className="backdrop-blur-md rounded-lg shadow-lg">
      <div className="p-3 border-b border-gray-200 glass-panel-tab">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-900">
              {isPathfinderMode ? 'Route Details' : selectedLine?.name}
            </h2>
            {selectedLine && <span className="text-sm text-gray-500">{selectedLine.id}</span>}
          </div>
          <button
            onClick={onBack}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-y-auto glass-panel">
        <div className="relative p-3">
          {/* Timeline line */}
          <div 
            className="timeline-line"
            style={{ backgroundColor: lineColor }}
          />

          {/* Stations */}
          {selectedLine?.stations.map((station, index) => (
            <div key={station.id} className="timeline-station">
              {/* Station Icon */}
              <div 
                className="timeline-station-icon"
                style={{ backgroundColor: lineColor }}
              >
                <Train size={18} />
              </div>

              {/* Station Content */}
              <div className="timeline-station-content">
                <div className="timeline-station-name">
                  {station.name}
                  <span className="ml-2 text-sm text-gray-500">{station.id}</span>
                </div>

                {/* Interchange Stations */}
                {station.interchangeStations && station.interchangeStations.length > 0 && (
                  <div className="timeline-section">
                    <div className="timeline-section-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4"/>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                        <path d="M7 23l-4-4 4-4"/>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                      </svg>
                      <span className="text-sm">Interchange Stations</span>
                    </div>
                    <div className="timeline-section-content">
                      {station.interchangeStations.map(id => {
                        const interchangeLine = lines.find(l => l.stations.some(s => s.id === id));
                        const interchangeStation = interchangeLine?.stations.find(s => s.id === id);
                        if (!interchangeLine || !interchangeStation) return null;
                        return (
                          <div key={id} className="timeline-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
                              <path d="M7 13h10"/>
                            </svg>
                            <span className="text-sm">{interchangeLine.type} {interchangeStation.name} {id}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Nearby Places */}
                {station.nearby && station.nearby.length > 0 && (
                  <div className="timeline-section">
                    <div className="timeline-section-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="text-sm">Nearby Highlights</span>
                    </div>
                    <div className="timeline-section-content">
                      {station.nearby.map((place, i) => (
                        <div key={i} className="timeline-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                          <span className="text-sm">{place}</span>
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
    </div>
  );
} 
import type { Line } from '~/types/map';
import { LINE_COLORS } from '~/types/map';
import { lines } from '~/lib/line';

type LineDetailsPanelProps = {
  selectedLine: Line | null;
  onBack: () => void;
};

export function LineDetailsPanel({ selectedLine, onBack }: LineDetailsPanelProps) {
  if (!selectedLine) {
    return (
      <div className="p-3 text-center text-gray-500">
        Select a line to view its route
      </div>
    );
  }

  return (
    <div>
      {/* Back button and Title */}
      <div className="p-3 flex items-center gap-2 border-b border-gray-200 bg-white/50">
        <button 
          className="flex items-center gap-1 text-gray-900"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Line name */}
      <div className="p-3">
        <h2 className="text-xl font-bold text-gray-900">{selectedLine.name} Line</h2>
      </div>

      {/* Stations list */}
      <div className="space-y-4 pb-4">
        {selectedLine.stations.map((station) => (
          <div key={station.id} className="px-3">
            <div className="flex items-start gap-3">
              <div 
                className="flex-shrink-0"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2"
                  style={{
                    borderColor: LINE_COLORS[selectedLine.color] || '#000000',
                    backgroundColor: 'white'
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: LINE_COLORS[selectedLine.color] || '#000000' }}>
                    {station.id.replace(selectedLine.id, '')}
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900 truncate">{station.name}</h3>
                  <span className="text-sm text-gray-500">{station.id}</span>
                </div>
                
                {/* Interchange Stations Section */}
                {station.interchangeStations && station.interchangeStations.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4"/>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                        <path d="M7 23l-4-4 4-4"/>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                      </svg>
                      <span className="text-sm">Interchange Stations</span>
                    </div>
                    <div className="space-y-1.5">
                      {station.interchangeStations.map(id => {
                        const interchangeLine = lines.find(l => l.stations.some(s => s.id === id));
                        const interchangeStation = interchangeLine?.stations.find(s => s.id === id);
                        if (!interchangeLine || !interchangeStation) return null;
                        return (
                          <div 
                            key={id}
                            className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
                          >
                            <div 
                              className="w-5 h-5 rounded-full border flex items-center justify-center text-xs"
                              style={{
                                borderColor: LINE_COLORS[interchangeLine.color] || '#000000',
                                backgroundColor: 'white',
                                color: LINE_COLORS[interchangeLine.color] || '#000000'
                              }}
                            >
                              {id.replace(interchangeLine.id, '')}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {interchangeLine.type} {interchangeStation.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Nearby Section */}
                {station.nearby && station.nearby.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="text-sm">Nearby Highlights</span>
                    </div>
                    <div className="space-y-1.5">
                      {station.nearby.map((place, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
                        >
                          <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                          <span className="text-sm text-gray-900">{place}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
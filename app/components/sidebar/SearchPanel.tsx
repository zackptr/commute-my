import type { Station } from '~/types/map';
import { LINE_COLORS } from '~/types/map';

type SearchPanelProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredStations: Station[];
  selectingFor: 'from' | 'to' | null;
  handleStationSelect: (station: Station) => void;
  map: any;
  setSelectedLine: (line: any) => void;
  lines: any[];
};

export function SearchPanel({
  searchQuery,
  setSearchQuery,
  filteredStations,
  selectingFor,
  handleStationSelect,
  map,
  setSelectedLine,
  lines
}: SearchPanelProps) {
  return (
    <div className="p-4 space-y-2">
      {searchQuery ? (
        filteredStations.length > 0 ? (
          filteredStations.map((station) => (
            <div
              key={station.id}
              className="flex items-center gap-3 p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100"
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
                className="flex-shrink-0 w-14 h-8 rounded-md flex items-center justify-center text-sm font-medium"
                style={{
                  backgroundColor: LINE_COLORS[station.lineColor] || '#000000',
                  color: 'white'
                }}
              >
                {station.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-900 truncate">{station.name}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {station.lineType} {station.lineName} Line
                  </div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {station.id}
                </div>
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
                className="flex-shrink-0 text-gray-400"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No stations found
          </div>
        )
      ) : (
        <div className="text-center text-gray-500 py-8">
          {selectingFor ? 'Select a station' : 'Type to search for stations'}
        </div>
      )}
    </div>
  );
} 
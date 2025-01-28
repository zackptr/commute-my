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
              className="flex items-center gap-3 p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-200"
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
                  backgroundColor: LINE_COLORS[station.lineColor] || '#000000'
                }}
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-900">{station.id}</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{station.name}</div>
                <div className="text-sm text-gray-500">{station.lineType} {station.lineName} Line</div>
              </div>
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
import type { Line } from '~/types/map';
import { LINE_COLORS } from '~/types/map';

type LinesPanelProps = {
  stationsByLine: Line[];
  expandedLines: Record<string, boolean>;
  toggleLineExpansion: (lineId: string) => void;
  setSelectedLine: (line: Line) => void;
  map: any;
};

export function LinesPanel({
  stationsByLine,
  expandedLines,
  toggleLineExpansion,
  setSelectedLine,
  map
}: LinesPanelProps) {
  return (
    <div className="p-4 space-y-2">
      {stationsByLine.map((line) => (
        <div key={line.id} className="bg-white border border-gray-200 rounded-lg">
          <div 
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 rounded-lg"
            onClick={() => toggleLineExpansion(line.id)}
          >
            <div className="flex items-center gap-2 flex-1">
              <div 
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: LINE_COLORS[line.color] || '#000000'
                }}
              />
              <h3 className="font-medium text-gray-900">{line.type} {line.name} Line</h3>
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
              className={`transform transition-transform text-gray-400 ${expandedLines[line.id] ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
          {expandedLines[line.id] && (
            <div className="border-t border-gray-200">
              {line.stations.map((station) => (
                <div
                  key={station.id}
                  className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedLine(line);
                    map?.setView([station.lat, station.lng], 15);
                  }}
                >
                  <span className="text-sm font-medium text-gray-500">{station.id}</span>
                  <span className="text-sm text-gray-900">{station.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 
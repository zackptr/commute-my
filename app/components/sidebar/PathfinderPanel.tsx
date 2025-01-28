import type { Station, Path } from '~/types/map';
import { LINE_COLORS } from '~/types/map';

type PathfinderPanelProps = {
  fromStation: Station | null;
  toStation: Station | null;
  setSelectingFor: (type: 'from' | 'to' | null) => void;
  setSelectedView: (view: 'search' | 'lines' | 'pathfinder') => void;
  setSearchQuery: (query: string) => void;
  findPath: (from: Station | null, to: Station | null) => Path | null;
};

export function PathfinderPanel({
  fromStation,
  toStation,
  setSelectingFor,
  setSelectedView,
  setSearchQuery,
  findPath
}: PathfinderPanelProps) {
  return (
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
                  backgroundColor: LINE_COLORS[fromStation.lineColor] || '#000000'
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
                  backgroundColor: LINE_COLORS[toStation.lineColor] || '#000000'
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
                        backgroundColor: LINE_COLORS[path.lines[0].line.color] || '#000000'
                      }}
                    />
                    <span className="font-medium">
                      {path.lines[0].line.type} {path.lines[0].line.name} Line
                    </span>
                  </div>
                  <div className="space-y-2 ml-6">
                    {path.lines[0].stations.map((station) => (
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
  );
} 
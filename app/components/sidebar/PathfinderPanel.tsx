import type { Station, Path } from '~/types/map';
import { LINE_COLORS } from '~/types/map';

type PathfinderPanelProps = {
  fromStation: Station | null;
  toStation: Station | null;
  setSelectingFor: (type: 'from' | 'to' | null) => void;
  setSelectedView: (view: ViewType) => void;
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
        <label className="block text-sm font-medium text-gray-600 mb-2">From Station</label>
        <div 
          className={`p-3 rounded-lg cursor-pointer ${
            fromStation 
              ? 'bg-white bg-opacity-50 backdrop-blur-sm' 
              : 'border-2 border-dashed border-gray-300'
          }`}
          onClick={() => {
            setSelectingFor('from');
            setSearchQuery(' ');
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
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-900">{fromStation.id}</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{fromStation.name}</div>
                <div className="text-sm text-gray-600">
                  {fromStation.lineType} {fromStation.lineName} Line
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-2">
              Select starting station
            </div>
          )}
        </div>
      </div>

      {/* To Station */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">To Station</label>
        <div 
          className={`p-3 rounded-lg cursor-pointer ${
            toStation 
              ? 'bg-white bg-opacity-50 backdrop-blur-sm' 
              : 'border-2 border-dashed border-gray-300'
          }`}
          onClick={() => {
            setSelectingFor('to');
            setSearchQuery(' ');
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
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-900">{toStation.id}</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{toStation.name}</div>
                <div className="text-sm text-gray-600">
                  {toStation.lineType} {toStation.lineName} Line
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-2">
              Select destination station
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
import type { Station, Path, ViewType } from '~/types/map';
import { LINE_COLORS } from '~/types/map';

type PathfinderPanelProps = {
  fromStation: Station | null;
  toStation: Station | null;
  setSelectingFor: (type: 'from' | 'to' | null) => void;
  setSelectedView: (view: ViewType) => void;
  setSearchQuery: (query: string) => void;
  findPath: (from: Station | null, to: Station | null) => Path | null;
  setFromStation: (station: Station | null) => void;
  setToStation: (station: Station | null) => void;
};

export function PathfinderPanel({
  fromStation,
  toStation,
  setSelectingFor,
  setSelectedView,
  setSearchQuery,
  findPath,
  setFromStation,
  setToStation
}: PathfinderPanelProps) {
  const handleReset = () => {
    setFromStation(null);
    setToStation(null);
    setSelectingFor(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Reset Button - Only show if either station is selected */}
      {(fromStation || toStation) && (
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 glass-panel-tab hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset Selection
        </button>
      )}

      {/* From Station */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">From Station</label>
        <div 
          className={`p-3 rounded-lg cursor-pointer ${
            fromStation 
              ? 'glass-panel-tab bg-opacity-50 backdrop-blur-sm' 
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
                <div className="w-8 h-8 rounded-full glass-panel-tab flex items-center justify-center">
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
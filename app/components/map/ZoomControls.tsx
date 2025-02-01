type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocationClick?: () => void;
};

export function ZoomControls({ onZoomIn, onZoomOut, onLocationClick }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-24 md:top-4 right-4 flex flex-col gap-2 z-[25] pointer-events-auto">
      {/* Location Button */}
      <div className="bg-white rounded-lg shadow-lg">
        <button 
          className="p-2 hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg"
          onClick={onLocationClick}
          aria-label="My Location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="bg-white rounded-lg shadow-lg">
        <button 
          className="p-2 hover:bg-gray-100 border-b border-gray-200 w-10 h-10 flex items-center justify-center"
          onClick={onZoomIn}
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          className="p-2 hover:bg-gray-100 w-10 h-10 flex items-center justify-center"
          onClick={onZoomOut}
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
} 
type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg">
      <button 
        className="p-2 hover:bg-gray-100 border-b border-gray-200 w-10 h-10 flex items-center justify-center"
        onClick={onZoomIn}
      >
        +
      </button>
      <button 
        className="p-2 hover:bg-gray-100 w-10 h-10 flex items-center justify-center"
        onClick={onZoomOut}
      >
        -
      </button>
    </div>
  );
} 
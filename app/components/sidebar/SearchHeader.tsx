import type { ViewType } from '~/types/map';
import { Link } from 'react-router';

type SearchHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  selectedView: ViewType;
  setSelectedView: (view: ViewType) => void;
};

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  selectedView,
  setSelectedView
}: SearchHeaderProps) {
  return (
    <div className="sticky top-0 z-10">
      {/* Search Input */}
      <div className="p-4 glass-panel-tab backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-4 mb-3">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for station..."
            className="w-full h-10 bg-gray-50/80 text-gray-900 placeholder-gray-500 rounded-lg px-4 py-2 pl-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          <svg
            className="absolute left-3 top-3 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex gap-1">
          <button
            className={`flex-1 py-1.5 px-4 rounded text-sm font-medium transition-colors ${
              selectedView === 'lines' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setSelectedView('lines')}
          >
            Lines
          </button>
          <button
            className={`flex-1 py-1.5 px-4 rounded text-sm font-medium transition-colors ${
              selectedView === 'pathfinder' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setSelectedView('pathfinder')}
          >
            Route
          </button>
        </div>
      </div>
    </div>
  );
} 
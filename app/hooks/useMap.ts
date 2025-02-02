import { useState, useEffect, useCallback } from 'react';
import type { Line, Path, Station } from '~/types/map';
import { lines } from '~/lib/line';

export function useMap() {
  const [map, setMap] = useState<any>(null);
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<Path | null>(null);

  // Get all stations from all lines
  const allStations = lines.flatMap(line => 
    line.stations.map(station => ({
      ...station,
      lineName: line.name,
      lineId: line.id,
      lineColor: line.color,
      lineType: line.type
    }))
  );

  // Group stations by line
  const stationsByLine = lines.map(line => ({
    ...line,
    stations: line.stations
  }));

  const handleZoomIn = useCallback(() => {
    if (map) map.zoomIn();
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) map.zoomOut();
  }, [map]);

  const handleLineClick = useCallback((line: Line) => {
    setSelectedLine(prev => prev?.id === line.id ? null : line);
  }, []);

  // Function to find the shortest path between two stations
  const findPath = useCallback((from: Station | null, to: Station | null): Path | null => {
    if (!from || !to) return null;

    // Helper function to find connecting stations between two lines
    const findConnections = (line1: Line, line2: Line) => {
      const connections: Array<{
        station1: typeof line1['stations'][0];
        station2: typeof line2['stations'][0];
      }> = [];

      line1.stations.forEach(station1 => {
        if (station1.interchangeStations) {
          station1.interchangeStations.forEach(id => {
            const station2 = line2.stations.find(s => s.id === id);
            if (station2) {
              connections.push({ station1, station2 });
            }
          });
        }
      });

      return connections;
    };

    const fromLine = lines.find(l => l.id === from.lineId);
    const toLine = lines.find(l => l.id === to.lineId);

    if (!fromLine || !toLine) return null;

    // If on the same line
    if (fromLine.id === toLine.id) {
      const stations = fromLine.stations;
      const fromIndex = stations.findIndex(s => s.id === from.id);
      const toIndex = stations.findIndex(s => s.id === to.id);
      
      if (fromIndex !== -1 && toIndex !== -1) {
        const path = stations.slice(
          Math.min(fromIndex, toIndex),
          Math.max(fromIndex, toIndex) + 1
        );
        
        return {
          lines: [{
            line: fromLine,
            stations: path
          }]
        };
      }
    }

    // If on different lines, find connecting stations
    const connections = findConnections(fromLine, toLine);
    
    if (connections.length > 0) {
      // Use the first connection found (can be improved with actual shortest path algorithm)
      const connection = connections[0];
      
      // Get path from origin to interchange
      const fromStations = fromLine.stations;
      const fromIndex = fromStations.findIndex(s => s.id === from.id);
      const interchangeIndex1 = fromStations.findIndex(s => s.id === connection.station1.id);
      
      const path1 = fromStations.slice(
        Math.min(fromIndex, interchangeIndex1),
        Math.max(fromIndex, interchangeIndex1) + 1
      );

      // Get path from interchange to destination
      const toStations = toLine.stations;
      const interchangeIndex2 = toStations.findIndex(s => s.id === connection.station2.id);
      const toIndex = toStations.findIndex(s => s.id === to.id);
      
      const path2 = toStations.slice(
        Math.min(interchangeIndex2, toIndex),
        Math.max(interchangeIndex2, toIndex) + 1
      );

      return {
        lines: [
          {
            line: fromLine,
            stations: path1
          },
          {
            line: toLine,
            stations: path2
          }
        ]
      };
    }

    return null;
  }, []);

  // Update highlighted path when stations change
  useEffect(() => {
    if (fromStation && toStation) {
      const path = findPath(fromStation, toStation);
      setHighlightedPath(path);
    } else {
      setHighlightedPath(null);
    }
  }, [fromStation, toStation, findPath]);

  return {
    map,
    setMap,
    selectedLine,
    setSelectedLine,
    fromStation,
    setFromStation,
    toStation,
    setToStation,
    highlightedPath,
    allStations,
    stationsByLine,
    handleZoomIn,
    handleZoomOut,
    handleLineClick,
    findPath
  };
} 
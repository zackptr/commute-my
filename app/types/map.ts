import type { LatLngBoundsLiteral } from 'leaflet';
import { lines } from '~/lib/line';

export type LineType = 'LRT' | 'MRT' | 'MR';

export type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  nearby?: string[];
  interchangeStations?: string[];
  connectingStations?: string[];
  lineName: string;
  lineId: string;
  lineColor: string;
  lineType: LineType;
};

export type Line = typeof lines[0];

export type Path = {
  lines: Array<{
    line: Line;
    stations: typeof lines[0]['stations'];
  }>;
};

export type ViewType = 'search' | 'lines' | 'pathfinder';

export const MAP_BOUNDS = {
  KL_SELANGOR_BOUNDS: [
    [2.8, 101.3], // Southwest coordinates
    [3.5, 101.9]  // Northeast coordinates
  ] as LatLngBoundsLiteral,
  
  VISIBLE_BOUNDS: [
    [2.0, 100.5], // Southwest coordinates (wider area)
    [4.3, 102.7]  // Northeast coordinates (wider area)
  ] as LatLngBoundsLiteral
};

export const LINE_COLORS: Record<string, string> = {
  'bg-lrt-ag': '#FF0000', // Ampang Line - Red
  'bg-lrt-sp': '#FF0000', // Sri Petaling Line - Red (same as Ampang)
  'bg-lrt-kj': '#800080', // Kelana Jaya Line - Purple
  'bg-mr-kl': '#FFA500',  // Monorail - Orange
  'bg-mrt-kg': '#00FF00', // Kajang Line - Green
  'bg-mrt-py': '#0000FF', // Putrajaya Line - Blue
}; 
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

export type ViewType = 'lines' | 'pathfinder';

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
  'bg-lrt-ag': '#CD7F32', // LRT Ampang Line - Brown
  'bg-lrt-sp': '#8B0000', // LRT Sri Petaling Line - Dark Red
  'bg-lrt-kj': '#B91C1C', // LRT Kelana Jaya Line - Red
  'bg-mr-kl': '#65A30D', // MR Monorail KL Line - Green
  'bg-mrt-kg': '#047857', // MRT Kajang Line - Dark Green
  'bg-mrt-py': '#CA8A04', // MRT Putrajaya Line - Gold/Yellow
}; 
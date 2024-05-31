import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FeatureBBox, GeometryType } from "./definitions";
import { MapConfigConstants } from "./AppConfig";
import { LngLatBoundsLike } from "react-map-gl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function getGeomType(type: number): string {
  if (type < 0) {
    return 'Unknown color';
  }
  switch (type) {
    case GeometryType.POINT:
      return 'POINT';
    case GeometryType.LineString:
      return 'LineString';
    case GeometryType.Polygon:
      return 'Polygon';
    default:
      return 'Geometry';
  }
}

export const lightColors = [
  'FC49A3', // pink
  'CC66FF', // purple-ish
  '66CCFF', // sky blue
  '66FFCC', // teal
  '00FF00', // lime green
  'FFCC66', // light orange
  'FF6666', // salmon
  'FF0000', // red
  'FF8000', // orange
  'FFFF66', // yellow
  '00FFFF'  // turquoise
];

export function randomColor(colors: string[]) {
  const randomNumber = Math.ceil(Math.random() * (colors.length - 1));
  return colors[randomNumber];
}

const default_web_mercator_bounds: LngLatBoundsLike = [-180, -85.05112877980659, 180, 85.0511287798066]
const default_cgcs2000_bounds: LngLatBoundsLike = [-180, -90, 180, 90]

export function getBounds(bbox: FeatureBBox | null, schema: string): LngLatBoundsLike {
  if (bbox) {
    return [bbox.minx, bbox.miny, bbox.maxx, bbox.maxy];
  }

  if (schema && schema === MapConfigConstants.TILE_SCHEMA_4490) {
    return default_cgcs2000_bounds;
  }

  if (schema && schema === MapConfigConstants.TILE_SCHEMA_3857) {
    return default_web_mercator_bounds;
  }

  // other schema?
  return default_web_mercator_bounds;
}

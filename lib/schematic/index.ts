export {
  FORBIDDEN_SCALE_BAND,
  MAX_SCHEMATIC_SCALE,
  PX_PER_MM,
  SizeConstraintError,
  assertSchematicWidth,
  isInsideForbiddenBand,
  scaleOf,
  schematicHeightPx,
  schematicWidthPx,
} from './constraint'
export type { PhysicalSize } from './constraint'
export { buildSchematic } from './outline'
export type { SchematicGeometry } from './outline'

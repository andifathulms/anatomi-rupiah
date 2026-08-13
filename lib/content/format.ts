/** Denominations carry no display label of their own — every view that needs
 * one derives it from valueIdr and emisi the same way, so it derives it here. */

export function formatIdr(valueIdr: number): string {
  return `Rp${valueIdr.toLocaleString('id-ID')}`
}

export function denominationLabel(valueIdr: number, emisi: number): string {
  return `${formatIdr(valueIdr)} · TE ${emisi}`
}

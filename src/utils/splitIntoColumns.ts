/**
 * Split a list into `count` roughly-equal sequential columns.
 * splitIntoColumns([1,2,3,4,5], 2) -> [[1,2,3],[4,5]]
 */
export function splitIntoColumns<T>(items: T[], count = 2): T[][] {
  const perColumn = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, index) =>
    items.slice(index * perColumn, index * perColumn + perColumn)
  );
}

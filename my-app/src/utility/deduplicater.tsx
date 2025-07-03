/**
 * Removes duplicate objects from an array based on a key.
 *
 * @param {T[]} array - The array of objects to deduplicate.
 * @param {(item: T) => string} getKey - A function that returns the unique key for each object.
 * @returns {T[]} A new array with only unique items.
 */
export function deduplicateByKey<T>(array: T[], getKey: (item: T) => string): T[] {
    const seen = new Set<string>();
    return array.filter((item) => {
        const key = getKey(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
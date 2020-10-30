/**
 * waitFor
 * https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 *
 * @param ms
 */
export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * asyncForEach
 * https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 *
 * @param array
 * @param callback
 */
export async function asyncForEach<T = unknown, R = unknown>(
  array: T[],
  callback: (current: T, index: number, values: T[]) => Promise<R>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

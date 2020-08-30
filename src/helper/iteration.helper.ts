export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function asyncForEach<T = unknown, R = unknown>(
  array: T[],
  callback: (current: T, index: number, values: T[]) => Promise<R>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

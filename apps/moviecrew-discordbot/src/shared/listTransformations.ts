export const chunkList = <T>(list: T[]): T[][] => {
  const chunks = [];
  for (let i = 0; i < list.length; i += 10) {
    chunks.push(list.slice(i, i + 10));
  }
  return chunks;
};

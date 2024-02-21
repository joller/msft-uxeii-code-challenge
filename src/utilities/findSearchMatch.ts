export function findSearchMatch(
  searchKey: string,
  data: string[]
): string[] | undefined {
  const matchKey = data.filter((item) => item.includes(searchKey));
  if (matchKey) {
    return matchKey;
  } else {
    return undefined;
  }
}

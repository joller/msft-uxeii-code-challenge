import { EnhancedDog } from "../services/getDogs";

export function findSearchMatch(
  searchKey: string,
  data: EnhancedDog[]
): EnhancedDog[] | undefined {
  const matchedData = data.filter(
    (item) =>
      item.breed === searchKey ||
      item.subBreed === searchKey ||
      searchKey.includes(`${item.subBreed} ${item.breed}`)
  );

  if (matchedData) {
    return matchedData;
  } else {
    return undefined;
  }
}

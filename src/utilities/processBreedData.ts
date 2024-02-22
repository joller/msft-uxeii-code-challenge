import { EnhancedDog } from "../services/getDogs";

// TODO sanitize data/remove repeats
export function processBreedData(obj: {
  [key: string]: string[] | [];
}): EnhancedDog[] {
  const flattenedArr = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Checks if the value is an array and not empty
    if (Array.isArray(value) && value.length > 0) {
      const updatedSubBreeds = value.map((item) => {
        return { breed: key, subBreed: item, isSubBreed: true };
      });
      flattenedArr.push(...updatedSubBreeds);
    } else {
      const updatedBreed = { breed: key, isSubBreed: false };
      flattenedArr.push(updatedBreed);
    }
  });

  return flattenedArr;
}

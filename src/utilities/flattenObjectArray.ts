export function flattenObjectArrays(obj: {
  [key: string]: string[] | [];
}): string[] {
  const flattenedArray: string[] = [];

  // Iterates through each key in the obj
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Checks if the value is an array and not empty
    if (Array.isArray(value) && value.length > 0) {
      //Flatten and add elements to the empty array
      flattenedArray.push(...value);
    }
  });

  return flattenedArray;
}

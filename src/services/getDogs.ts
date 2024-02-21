interface AllDogsResponse {
  message: {
    string: [] | string[];
  };
  status: string;
}

export const getAllDogs = async () => {
  const url = "https://dog.ceo/api/breeds/list/all";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

interface RandomDogsResponse {
  message: string[];
  status: string;
}

export type RandomDog = {
  img: string;
  label: string;
};

export const getRandomDogs = async (
  amount: number
): Promise<RandomDogsResponse> => {
  // Base URL of the API you are calling
  const url = `https://dog.ceo/api/breeds/image/random/${amount}`;

  try {
    // Make the GET request
    const response = await fetch(url, {
      method: "GET", // This is optional as GET is the default method
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Assuming the response is JSON. Adjust accordingly if it's not.
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export const getDogsByBreed = async (breed: string) => {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// if (matchedResultsArr.length < searchMatchResult.length) {
//   console.log('if results are <')
//   searchMatchResult.forEach(breed => {
//     getDogsByBreed(breed).then(data => {
//       // Getting image data
//       const imageData = data.message
//       // creating an object that has imgData and label
//       const enhancedBreedObj = {img: imageData, label: breed.toString()}
//       matchedResultsArr.push(enhancedBreedObj)
//     })
//   });
// } else {
//   console.log('if results are >')
//     setmatchedResultsArr(matchedResultsArr)
//     setResults(matchedResultsArr)
//     console.log(matchedResultsArr)
//     setmatchedResultsArr([])

// }

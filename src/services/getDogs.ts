// TODO fix this type
interface AllDogsResponse {
  message: any;
  status: string;
}

interface DogsImageResponse {
  message: string[];
  status: string;
}

export type EnhancedDog = {
  img: string;
  breed: string;
  subBreed?: string;
  isSubBreed?: boolean;
};

export const getAllDogs = async (): Promise<AllDogsResponse> => {
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

export const getRandomDogImages = async (
  amount: number
): Promise<DogsImageResponse> => {
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

export const getDogImagesByBreed = async (
  breed: string
): Promise<DogsImageResponse> => {
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

export const getDogImagesBySubBreed = async (
  breed: string,
  subBreed: string
): Promise<DogsImageResponse> => {
  const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;

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

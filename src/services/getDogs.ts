import axios from "axios";

export const getAllDogs: any = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
export const getDogByBreed: any = async (breed) => {
    try {
      const response = await axios.get(`https://dog.ceo/api/${breed}/images`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
export const getRandomDogs: any = async (amount) => {
  try {
    const response = await axios.get(`https://dog.ceo/api/breeds/image/random/${amount}`)
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}
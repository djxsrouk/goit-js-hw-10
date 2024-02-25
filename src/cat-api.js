import axios from "axios";
const API_KEY = "live_vos3kwkAbGaaoZQyLCuJIyH24TkWhREG1zl1bMEGP6v5hDfDWxRrBgrILEuyjHDE";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const breedSelect = document.querySelector('.breed-select');

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching cat breeds`, error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching cat information for breed ${breedId}`, error);
    });
}


import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.getElementById("breed-select");
const catInfo = document.getElementById("cat-info");
const loader = document.getElementById("loader");
const error = document.getElementById("error");

function populateBreeds() {
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      breedSelect.addEventListener("change", handleBreedSelect);
    })
    .catch(err => showError())
    .finally(() => hideLoader());
}

function handleBreedSelect() {
  const breedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(breedId)
    .then(catData => {
      const cat = catData[0];
      const catHtml = `
        <img src="${cat.url}" alt="Cat" style="max-width: 100%; height: auto; display: block; margin: 0 auto; padding-top:25px;">
        <p style="text-align: center; padding: auto;"><strong>Descriere:</strong> ${cat.breeds[0].description}</p>
        <p style="text-align: center; padding: auto;"><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      `;
      catInfo.innerHTML = catHtml;
      catInfo.style.display = "block";
    })
    .catch(err => showError())
    .finally(() => hideLoader());
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}

function init() {
  populateBreeds();
}


init();
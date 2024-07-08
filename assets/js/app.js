// Neccessary Link
const phoneList = document.querySelector(".phones__list");
const showAll = document.getElementById("showAll");
console.log(showAll);

// Load Data
const loadData = async (items) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${items}`
  );
  const data = await response.json();
  const phones = data.data;
  displayData(phones);
};

// Display Data
const displayData = (data) => {
  phoneList.innerHTML = "";
  if (data.length > 6) {
    showAll.classList.remove("hidden");
    console.log("hello");
  } else {
    showAll.classList.add("hidden");
  }
  data = data.slice(0, 6);
  data.forEach((elem) => {
    const card = document.createElement("div");
    card.classList = `card bg-base-100 w-full shadow-xl`;
    card.innerHTML = `
        <figure class="px-10 pt-10">
            <img
            src="${elem.image}"
            alt="Shoes"
            class="rounded-xl"
            />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${elem.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `;
    loadSpinner(false);

    phoneList.appendChild(card);
  });
};

const getSearch = () => {
  loadSpinner(true);
  const searchInput = document.querySelector(".search__input ");
  const searchValue = searchInput.value;
  loadData(searchValue);
};

const searchBtn = document.querySelector(".search__btn");
searchBtn.addEventListener("click", getSearch);

function loadSpinner(isLoading) {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("hidden");
  } else {
    loaderSpinner.classList.add("hidden");
  }
}


loadSpinner(true);

loadData('iphone');

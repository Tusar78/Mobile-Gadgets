// Neccessary Link

// Load Data
const loadData = async (items, isShowAll) => {
  console.log(isShowAll);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${items}`
  );
  const data = await response.json();
  const phones = data.data;
  displayData(phones, isShowAll);
};

// Display Data
const displayData = (data, isShowAll) => {
  const phoneList = document.querySelector(".phones__list");
  phoneList.textContent = "";

  const showAll = document.getElementById("showAll");
  if (data.length > 6 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  console.log("Is show all: ", isShowAll);

  if (!isShowAll) {
    data = data.slice(0, 6);
  } else {
    data = data.slice(0, -1);
    console.log('Hi');
  }
  console.log(data);
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

const getSearch = (isShowAll) => {
  loadSpinner(true);
  const searchInput = document.querySelector(".search__input ");
  const searchValue = searchInput.value;
  loadData(searchValue, isShowAll);
};

function loadSpinner(isLoading) {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("hidden");
  } else {
    loaderSpinner.classList.add("hidden");
  }
}

const showAllFunc = () => {
  getSearch(true);
};

loadSpinner(true);

loadData("iphone", true);

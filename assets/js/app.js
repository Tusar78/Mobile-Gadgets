// Neccessary Element
const cardContainer = document.querySelector(".phones__list");
const searchField = document.querySelector(".search__input ");
const searchBtn = document.querySelector(".search__btn");
const loader = document.querySelector("#loader");

// Data Load
const loadData = async (searchText) => {
  const load = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const res = await load.json();
  const phones = res.data;
  displayData(phones);
};

// Display Data to the DOM
const displayData = (phones) => {
  // Initial Clean The Card Container
  cardContainer.textContent = "";

  // Processes Data For Display
  if (phones.length > 0) {
    phones.forEach((phone) => {
      const card = document.createElement("div");
      card.classList =
        "card bg-white w-full border rounded-lg border-[#CFCFCF] p-[25px]";
      card.innerHTML = `
        <div
            class="card__thumbs w-full h-[300px] bg-[#0D6EFD]/5 rounded-lg overflow-hidden flex justify-center items-center p-10"
        >
            <img
            src="${phone.image}"
            alt="Shoes"
            class="object-contain w-full h-full"
            />
        </div>
        <div class="card__body px-3 pt-[25px] text-center">
            <h2 class="card__title text-[25px] font-bold text-[#706F6F]">${phone.phone_name}</h2>
            <p class="mt-5 mb-2 text-lg text-[#706F6F]">
            There are many variations of passages of available, but the
            majority have suffered
            </p>
            <span class="block text-[25px] font-bold text-[#706F6F] mb-4"
            >$999</span
            >
            <button
            class="btn hover:bg-blue-500 bg-blue-600 text-white rounded-lg text-xl font-semibold px-[25px] py-[9px]"
            >
            Show Details
            </button>
        </div>
            `;

      // End Spinner
      loadSpinner(false);

      // Push Data to the Card Container
      cardContainer.append(card);
    });
} else {
    loadSpinner(false);
    cardContainer.innerHTML = 'Data Not Found'

  }
};

// Search Functionality
searchField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchText = e.target.value;
    loadData(searchText);
    loadSpinner(true);

    // Clear Field After Search
    searchField.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  const searchText = searchField.value;
  loadData(searchText);
  loadSpinner(true);

  // Clear Field After Search
  searchField.value = "";
});

// Loading Animation Before Display Data
const loadSpinner = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

loadData("iphone");

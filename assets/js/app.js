// Neccessary Element
const cardContainer = document.querySelector(".phones__list");
const searchField = document.querySelector(".search__input ");
const searchBtn = document.querySelector(".search__btn");
const loader = document.querySelector("#loader");
const showBtn = document.querySelector("#showAll");
const cardModal = document.querySelector("#card__modal");

// Data Load
const loadData = async (searchText = "iphone", isShowAll) => {
  const load = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const res = await load.json();
  const phones = res.data;
  displayData(phones, isShowAll);
};

// Display Data to the DOM
const displayData = (phones, isShowAll) => {
  // Initial Clean The Card Container
  cardContainer.textContent = "";

  // Display ShowAll Button
  if (phones.length > 6 && !isShowAll) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 6);
  } else {
    phones = phones.slice(0, -1);
  }

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
            onclick="getId('${phone.slug}')"
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
    cardContainer.innerHTML = "Data Not Found";
  }
};

// Search Functionality
searchField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchText = e.target.value;
    loadData(searchText);
    loadSpinner(true);

    // Clear Field After Search
    // searchField.value = "";
  }
});

const searchFunc2 = (isShowAll) => {
  const searchText = searchField.value;
  loadData(searchText, isShowAll);
  loadSpinner(true);

  // Clear Field After Search
  // searchField.value = "";
};
// searchBtn.addEventListener("click", function (e) {
//   searchFunc2(e)
// });

// Loading Animation Before Display Data
const loadSpinner = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// Show All Data
const allData = () => {
  searchFunc2(true);
};

showBtn.addEventListener("click", allData);

// Get Id
const getId = async (id) => {
  const req = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const res = await req.json();
  const phone = res.data;

  showPhone(phone);
};

const showPhone = (phone) => {
  // dialogWrap.getAttribute("id").showModal();
  const singleImg = document.getElementById("single__img");
  singleImg.src = `${phone.image}`;

  const modalBody = document.querySelector(".modal__body");
  modalBody.classList = "modal__body my-10";
  modalBody.innerHTML = `
      <h2 class="modal__title text-[30px] font-bold text-[#706F6F]">
        ${phone.name}
      </h2>
      <p class="modal__text text-base text-[#706F6F] pt-6 pb-5">
        It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout.
      </p>

      <div class="modal__additions flex flex-col gap-4">
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Storage : </span>${phone.mainFeatures.storage}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Display Size : </span>${phone.mainFeatures.displaySize}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Chipset : </span>${phone.mainFeatures.chipSet}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Memory : </span>${phone.mainFeatures.memory}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Slug : </span>${phone.slug}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Release data : </span>${phone.releaseDate}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">Brand : </span>${phone.brand}
        </p>
        <p class="text-xl text-[#706F6F] font-normal">
          <span class="font-semibold">GPS : </span>${phone?.others?.GPdS || "No Data"}
        </p>
      </div>
  `;

  card__modal.showModal();
};

loadData();


// {
//   "status": true,
//   "data": {
//       "mainFeatures": {
//           "storage": "128GB/256GB/512GB storage, no card slot",
//           "displaySize": "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)",
//           "chipSet": "Apple A15 Bionic (5 nm)",
//           "memory": "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM",
//           "sensors": [
//               "Face ID",
//               "accelerometer",
//               "gyro",
//               "proximity",
//               "compass",
//               "barometer"
//           ]
//       },
//       "slug": "apple_iphone_13_mini-11104",
//       "name": "iPhone 13 mini",
//       "releaseDate": "Released 2021, September 24",
//       "brand": "Apple",
//       "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
//   }
// }
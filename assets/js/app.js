const phoneList = document.querySelector(".phones__list");
// console.log(phoneList);

// Data Get
const getData = async (searchData) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchData}`
  );
  const data = await response.json();
  const phones = data.data;
  displayData(phones);
};

// fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//   .then((res) => res.json())
//   .then((data) => displayData(data));

const displayData = (data) => {
  data.forEach(elem => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-full shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src="${elem.image}"
                alt="Shoes"
                class="rounded-xl"
                />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    `
    phoneList.appendChild(card);
  });
};

getData('iphone');

const getSearch = () => {
  const searchInput = document.querySelector(".search__input ");
  const searchValue = searchInput.value;
  getData(searchValue);
}

const searchBtn = document.querySelector(".search__btn");
searchBtn.addEventListener("click", getSearch)
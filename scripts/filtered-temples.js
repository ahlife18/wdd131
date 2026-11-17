const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Salt_Lake_Temple_UT1.jpg",
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42000,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/LDS_Laie_Hawaii_Temple_front_view.jpg",
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 143969,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/St._George_Utah_Temple%2C_a_temple_of_the_Church_of_Jesus_Christ_of_Latter-Day_Saints_%28LDS_Church%29_in_St._George%2C_Utah.jpg",
  },
];

const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");
const gallery = document.getElementById("gallery");
const resultsStatus = document.getElementById("results-status");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last modified: ${document.lastModified}`;

function formatDedicatedDate(dedicated) {
  const [year, month, day] = dedicated.split(", ");
  return new Date(`${month} ${day}, ${year}`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTemples(filter) {
  if (filter === "old") {
    return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) < 1900);
  }
  if (filter === "new") {
    return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) > 2000);
  }
  if (filter === "large") {
    return temples.filter((temple) => temple.area > 90000);
  }
  if (filter === "small") {
    return temples.filter((temple) => temple.area < 10000);
  }
  return temples;
}

function displayTemples(filter = "home") {
  const filteredTemples = getTemples(filter);

  gallery.innerHTML = filteredTemples
    .map(
      (temple) => `
        <article class="temple-card">
          <img
            src="${temple.imageUrl}"
            alt="${temple.templeName}"
            width="400"
            height="250"
            loading="lazy"
          />
          <div class="temple-details">
            <h2>${temple.templeName}</h2>
            <dl>
              <div><dt>Location</dt><dd>${temple.location}</dd></div>
              <div><dt>Dedicated</dt><dd>${formatDedicatedDate(temple.dedicated)}</dd></div>
              <div><dt>Area</dt><dd>${temple.area.toLocaleString("en-US")} sq ft</dd></div>
            </dl>
          </div>
        </article>
      `,
    )
    .join("");

  resultsStatus.textContent = `Showing ${filteredTemples.length} ${
    filteredTemples.length === 1 ? "temple" : "temples"
  }`;

  primaryNavigation.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });
}

document.documentElement.classList.add("js");
menuToggle.hidden = false;

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.firstElementChild.textContent = isOpen ? "×" : "☰";
  primaryNavigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    displayTemples(filterButton.dataset.filter);
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

displayTemples();

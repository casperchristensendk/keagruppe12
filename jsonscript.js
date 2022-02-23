// Lav en variabel, der refererer til ".toggle-btn"
const btn = document.querySelector(".toggle-btn");
// Lav en variabel, der refererer til "nav"
const nav = document.querySelector("nav");

// Lav en function, der hedder toggleMenu()
function toggleMenu() {
  nav.classList.toggle("shown");

  // 1. Toggle en klasse på nav vha. classList.toggle
  // 2. Toggle en klasse, der hedder "shown"

  // 1. Lav en variabel, der hedder menuShown
  // 2. Den skal være lig med, om nav-variablen indeholder klassen "shown" vha. classList.contains("")

  const menuShown = nav.classList.contains("Shown");
  // 1. Lav en if/else sætning => if (...) {...} else {...}
  // 2. Spørg om menu i if-sætningen => if (menu)
  if (menuShown == true) {
    btn.textContent = "X";
    // hvis nav har klassen "shown", sæt da btn.textContent til "Luk"
  } else {
    btn.textContent = "☰";
    // hvis IKKE nav har klassen "shown", sæt da btn.textContent til "Menu"
  }
}

/* Tilføj et klik-event til btn, der sætter toggleMenu-funktionen i gang */
btn.addEventListener("click", toggleMenu);

const header = document.querySelector("header h1");
const myHeaders = {
  "x-apikey": "620e1ecc34fd6215658586f9",
};

document.addEventListener("DOMContentLoaded", start);

let albums;
let filter = "alle";
function start() {
  const filterknapper = document.querySelectorAll("nav button");
  filterknapper.forEach((knap) =>
    knap.addEventListener("click", filtrerAlbums)
  );
  loadJSON();
}
function filtrerAlbums() {
  filter = this.dataset.plader;
  visAlbums();
}

async function loadJSON() {
  console.log("loadJSON");
  const JSONdata = await fetch(
    "https://pladepusheren-6cfc.restdb.io/rest/albums",
    { headers: myHeaders }
  );
  albums = await JSONdata.json();
  console.log("Albums", albums);
  visAlbums();
}
// function vis(json) {
//   console.log(json);
// }

const dest = document.querySelector("#liste");
const skabelon = document.querySelector("template").content;

function visAlbums() {
  console.log("visAlbums");
  dest.textContent = "";
  albums.forEach((album) => {
    console.log("genre", album.genre);
    console.log("alle filter: " + filter);
    if (filter == album.genre || filter == "alle") {
      const klon = skabelon.cloneNode(true);
      klon.querySelector(".artist").textContent = album.artist;

      klon.querySelector(".artwork").src = "medium/" + album.artwork;
      klon.querySelector("p").textContent = album.kortbeskrivelse;

      klon.querySelector(".pris").textContent = album.pris + ",-";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(album));
      dest.appendChild(klon);

      // Henter single visning
      modal
        .querySelector("#singlevisning")
        .addEventListener("click", () => visDetaljer(album));
      container.appendChild(klon);
    }
  });
  function visDetaljer(hvad) {
    location.href = `singleview.html?id=${hvad._id}`;
  }
}

// Modal

const container = document.querySelector("section");
const modal = document.querySelector("#modal");

function visDetaljer(album) {
  console.log(album);
  modal.querySelector("h2").textContent = album.artist;
  modal.querySelector(".artwork").src = "medium/" + album.artwork;
  modal.querySelector("p").textContent = album.kortbeskrivelse;
  modal.querySelector(".langbeskrivelse").textContent = album.langbeskrivelse;
  modal.querySelector(".pris").textContent = album.pris + ",-";
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));

// Hover effekt

// Vinyl effekt

$("#container").hover(
  function () {
    var record = $("img:eq(0)", this);
    record.stop(1, 0).animate(
      {
        left: "400px",
      },
      1000,
      function () {
        record.css("z-index", 11).stop(1, 0).animate(
          {
            left: "0px",
          },
          1000
        );
      }
    );
  },
  function () {
    var record = $("img:eq(0)", this);
    record.stop(1, 0).animate(
      {
        left: "400px",
      },
      1000,
      function () {
        record.css("z-index", 1).stop(1, 0).animate(
          {
            left: "0px",
          },
          1000
        );
      }
    );
  }
);

const header = document.querySelector("header h1");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

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
    `https://pladepusheren-6cfc.restdb.io/rest/albums/${id}`,
    { headers: myHeaders }
  );
  albums = await JSONdata.json();
  console.log("Albums", albums);
  visAlbums();
}
// function vis(json) {
//   console.log(json);
// }

// const dest = document.querySelector("#liste");
// const skabelon = document.querySelector("#singlevisning").content;

function visAlbums() {
  console.log("visAlbums");
  // dest.textContent = "";
  // albums.forEach((album) => {
  console.log("genre", albums.genre);
  console.log("alle filter: " + filter);
  if (filter == albums.genre || filter == "alle") {
    // const klon = skabelon.cloneNode(true);
    document.querySelector(".artist").textContent = albums.artist;

    document.querySelector(".artwork").src = "medium/" + albums.artwork;
    document.querySelector("p").textContent = albums.kortbeskrivelse;

    document.querySelector(".pris").textContent = albums.pris + ",-";
    // document
    //   .querySelector("article")
    //   .addEventListener("click", () => visDetaljer(albums));
    // dest.appendChild(document);
  }
  // });
}

// Modal

// const container = document.querySelector("section");
// const modal = document.querySelector("#modal");

// function visDetaljer(album) {
//   console.log(album);
//   modal.querySelector("h2").textContent = album.artist;
//   modal.querySelector(".artwork").src = "medium/" + album.artwork;
//   modal.querySelector("p").textContent = album.kortbeskrivelse;
//   modal.querySelector(".langbeskrivelse").textContent = album.langbeskrivelse;
//   modal.querySelector(".pris").textContent = album.pris + ",-";
//   modal.style.display = "block";
// }

// modal.addEventListener("click", () => (modal.style.display = "none"));

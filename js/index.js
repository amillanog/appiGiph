// import { apiConfig } from "./apiConfig.js";
const btn = document.querySelector("#btnSearch");
const input = document.querySelector("#inputSearch");
const container = document.querySelector(".main-giphy");
const title = document.querySelector("#title");
const logoHeader = document.querySelector("#logoHeader");
const footer = document.querySelector("#footer");

document.addEventListener("DOMContentLoaded", () => {
  footer.innerHTML = `
  <p>amillanog@gmail.com</p>
    `;
  container.innerHTML = "";
  getTrending(limite);
});

let limite = 15;
let limiteMaximo = "";
let ultimoGif;
let listaGifs = [];
const url = {
  trending: "https://api.giphy.com/v1/gifs/trending",
  search: "https://api.giphy.com/v1/gifs/search",
};
const apiKey = {
  trending: "?api_key=enNwQje8gpdGtWLwVbXviXojL4tYueIq",
  search: "&api_key=cH46EyHAatV97AG0h0xWQEINcr1aUAJd",
};

const getUrl = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.data.length > 0) {    
      listaGifs.push(data.data);
      limiteMaximo = data.data.length;
    } else {
      title.innerHTML = "No se encontraron resultados";
    }
  } catch (error) {
    console.log(error);
  }
};

const armarGifs = (listaGifs) => {
  listaGifs.map((gif) => {
    container.innerHTML += `
  <div  class="box-card"> 
    <div class="card">
      <img src="${gif.images.original.url}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-title">${gif.title}</p>                                           
      </div>
    </div>            
  </div>
  `;
    const obtenerGifsEnPantalla = document.querySelectorAll(".box-card");
    ultimoGif = obtenerGifsEnPantalla[obtenerGifsEnPantalla.length - 1];
    observer.observe(ultimoGif);
  });
};

//obsrvador
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // const newList = listaGifs[0].slice(limite, (limite += 15));
        armarGifs(listaGifs[0]);
      }
    });
  },
  { threshold: 1.0, rootMargin: "0px 0px 300px 0px" }
);

logoHeader.addEventListener("click", () => {
  window.location.reload();
});

//busqueda
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  listaGifs = [];
  const urlBusqueda = `${url.search}?q=${input.value}${apiKey.search}`;
  container.innerHTML = "";
  title.innerHTML = "Resultado de busqueda Gifs";
  await getUrl(urlBusqueda);
  if (listaGifs.length > 0) {
    // const newList = listaGifs[0].slice(0, limite);
    armarGifs(listaGifs[0]);
    title.innerHTML = "Gifs mas Populares";
  }
});

//trending
const getTrending = async () => {
  const urlTrending = `${url.trending}${apiKey.trending}`;
  await getUrl(urlTrending);
  if (listaGifs.length > 0) {
    // const newList = listaGifs[0].slice(0, limite);
    armarGifs(listaGifs[0]);
    title.innerHTML = "Gifs mas Populares";
  }
};

let film_nameH1;
let episode_information;
let episode_idSp;
let directorSp;
let release_dateSp;
let opening_crawlSp;
let charactersUl;
let planetsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    film_nameH1 = document.querySelector('h1#film_name');
    episode_idSp = document.querySelector('span#episode_id');
    directorSp = document.querySelector('span#director');
    release_dateSp = document.querySelector('span#release_date');
    opening_crawlSp = document.querySelector('span#opening_crawl');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

  async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id)
      console.error("Through #1")
      film.characters = await fetchCharacters(id)
      console.error("Through #2")
      console.log("test");
      film.planets = await fetchPlanets(id)
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }
  async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
  }

  async function fetchCharacters(id) {
    const url = `${baseUrl}/films/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }
  async function fetchPlanets(id) {
    const url = `${baseUrl}/films/${id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
  }
  const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    film_nameH1.textContent = film?.name;
    episode_idSp.textContent = film?.episode_id;
    directorSp.textContent = film?.director;
    release_dateSp.textContent = film?.release_date;
    opening_crawlSp.textContent = film?.opening_crawl;
    const charactersList = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    characters.innerHTML = charactersList.join("");
    const planetsList = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsList.join("");
  }
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climate = document.querySelector('span#climate');
    gravity = document.querySelector('span#gravity');
    diameter = document.querySelector('span#diameter');
    surface_water = document.querySelector('span#surface_water');
    terrain = document.querySelector('span#terrain');
    population = document.querySelector('span#population');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

// Get planet and get attributes
async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id);
      planet.characters = await fetchCharacters(planet); 
      planet.films = await fetchFilms(planet);
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
}

async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
}

async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
}

const renderPlanet = planet => {
    // render the generic details
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climate.textContent = planet?.climate;
    gravity.textContent = planet?.gravity;
    diameter.textContent = planet?.diameter;
    surface_water.textContent = planet?.surface_water;
    terrain.textContent = planet?.terrain;
    population.textContent = planet?.population;
    
    // create lists for people and characters
    const charsLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charsLis.join("");
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
}
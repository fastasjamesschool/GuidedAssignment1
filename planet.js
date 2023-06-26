const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climate = document.querySelector('span#climate');
    gravity = document.querySelector('span#gravity');
    diameter = document.querySelector('span#diameter');
    //TODO: add query for list tags
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      //planet.characters = 
      //planet.films = 
      console.log(planet)
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

  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climate.textContent = planet?.climate;
    gravity.textContent = planet?.gravity;
    diameter.textContent = planet?.diameter;
    //homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    //const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    //filmsUl.innerHTML = filmsLis.join("");
  }
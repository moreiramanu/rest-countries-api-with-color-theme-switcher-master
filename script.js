const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');


let allCountriesData = [];


const codigosOrdenados = ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"];


fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3')
  .then((res) => res.json())
  .then((data) => {
    const dadosPorCodigo = {};
    data.forEach((country) => {
      dadosPorCodigo[country.cca3] = country;
    });


    const paisesSelecionados = codigosOrdenados
      .map((codigo) => dadosPorCodigo[codigo])
      .filter(Boolean);


    allCountriesData = paisesSelecionados;
    renderCountries(paisesSelecionados);
  });


filterByRegion.addEventListener('change', () => {
  const filtered = allCountriesData.filter(
    (country) => country.region === filterByRegion.value
  );
  renderCountries(filtered);
});


function renderCountries(data) {
  countriesContainer.innerHTML = '';
  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `/paises.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}


searchInput.addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(termo)
  );
  renderCountries(filtrados);
});


themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

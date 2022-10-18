
export function setCountryListTemplate({ flags, name }) {
    return `
    <li class="country-list__item">
    <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width="30"/>
    <h2 class="country-list__name"> ${name.official}</h2>
    </li>`;
}
export function setCountryCardTemplate({ flags, name, capital, population, languages }) {
    return `
    <div class="country-card__container">
    <div class="country-card__wrapper">
    <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width="50"/>
    <h2 class="country-list__name"> ${name.official}</h2>
    </div>
    <p class="country-card__capital"><span class="country-card__text"> Capital:</span> ${capital}</p>
    <p class="country-card__population"><span class="country-card__text"> Population:</span> ${population}</p>
    <p class="country-card__language"><span class="country-card__text"> Languages:</span> ${Object.values(languages)}</p>
    </div>`;
}
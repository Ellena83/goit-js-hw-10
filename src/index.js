import './css/styles.css';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import debounce from "lodash.debounce";
import { refs } from "./js/refs";
import { fetchCountries } from "./js/fetchCountries";
import { setCountryListTemplate, setCountryCardTemplate } from "./js/markupTemplates";

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    const country = refs.searchBox.value.trim();
    if (country === '') {
        refs.countryList.innerHTML = '';
        refs.countryCard.innerHTML = '';
        return;
    }
    fetchCountries(country)
        .then(countries => {
            if (countries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                refs.countryList.innerHTML = '';
                refs.countryCard.innerHTML = '';
                return;
            }
            if (countries.length <= 10 && countries.length >= 2) {
                const markupList = countries.map(country => setCountryListTemplate(country));
                refs.countryList.innerHTML = markupList.join('');
                refs.countryCard.innerHTML = '';

            }
            if (countries.length === 1) {
                const markup = countries.map(country => setCountryCardTemplate(country));
                refs.countryCard.innerHTML = markup.join('');
                refs.countryList.innerHTML = '';
            }
        })
        .catch(error => {
            Notify.failure("Oops, there is no country with that name");
            refs.countryList.innerHTML = '';
            refs.countryCard.innerHTML = '';
            return error;
        });
}

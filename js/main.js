import {getCoords} from './geolocation.js';
import {getAddressFromCoords} from './addressApi.js';
import {waitFor} from './utils.js';
import {getPostalCode} from './addressApi.js';

const elements = {
    geolocationBtn: document.querySelector('#geolocation-btn'),
    addressText: document.querySelector('#address-text'),
    errorText: document.querySelector('#error-text'),
    cinemaList: document.querySelector('#cinema-list'),
    cinemaForm: document.querySelector('#cinemas-form')
};

const url = 'https://data.culture.gouv.fr/explore/dataset/etablissements-cinematographiques/api/';

elements.geolocationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    getCoords().then(({latitude, longitude}) => getAddressFromCoords(latitude, longitude)).then(address => {
        elements.addressText.textContent = address; 
    }).catch(error => {
        elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');
        
        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
    });
});

elements.cinemaForm.addEventListener('click', () => {
    
    getPostalCode().then(({code_insee}) => getAddressFromCoords(code_insee)).then(address => {
        elements.addressText.textContent = address; 
    }).catch(error => {
        elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');
        
        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
    });
    
    fetch(`${url}/etablissements-cinematographiques`).then(response => response.json()).then(response => {
        
        elements.cinemaList.innerHTML = response.map(city => {
            return `<li>${results.nom} (${results.code_insee.join(', ')})</li>`;
        }).join('');
    });
});

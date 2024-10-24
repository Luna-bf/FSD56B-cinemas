export function getAddressFromCoords(latitude, longitude) {
    return fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`).then(response => response.json()).then(response => {
        if (response.features.length == 0) {
            throw new Error("No matching address for this lat and lon");
        }
        
        return response.features[0].properties.label;
    });
}

export function getPostalCode(postcode) {
    return fetch(`https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&${postcode}=69002`).then(response => response.json()).then(response => {
        if (response.features.length == 0) {
            throw new Error("No matching postal code for this address");
        }
            
        return response.features[0].properties.label;
    });
}

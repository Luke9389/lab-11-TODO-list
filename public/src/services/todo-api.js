
const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getTasks(options) {
    const showAll = options && options.showAll;
    const url = `${URL}/types${showAll ? '?show=all' : ''}`;
    return fetchWithError(url);
}
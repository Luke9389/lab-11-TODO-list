
const URL = '/api';

function fetchWithError(url) {
    return fetch(url)
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

export function getTasks() {
    const url = `${URL}/tasks`;
    return fetchWithError(url);
}

export function addTask(task) {
    const url = `${URL}/tasks`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}




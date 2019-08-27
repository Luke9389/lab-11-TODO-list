
const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            console.log('response from db', response);
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
    console.log('task in todo-api', task);
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}

export function updateTask(task) {
    const url = `${URL}/tasks/${task.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}




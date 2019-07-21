const gallery = document.getElementById('gallery');

/**
 * uses fetch to grab 12 users for the page
 * then calls the appendUsers function
 */
function getUsers() {
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(data => appendUsers(data.results))
        .catch(err => {
            console.log(new Error(err));
            gallery.innerHTML = '<h3>Uh oh! There was an error receiving the users!</h3>';
        });
}

getUsers();

/**
 * Loops through the data and appends
 * the data according to the template
 * @param {object} data - data from the API call
 */
function appendUsers(data) {
    console.log(data)
    const people = data.map(item => {
        const html = `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${item.picture.large}" alt="${item.name.first} ${item.name.last}">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                            <p class="card-text">${item.email}</p>
                            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
                        </div>
                    </div>`;
        return html;
    }).join('');
    gallery.innerHTML = people;
}
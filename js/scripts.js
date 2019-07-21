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
    const people = data.map((item, index) => {
        const html = `<div class="card" id="${item.name.first}${item.name.last}">
                        <div class="card-img-container">
                            <img class="card-img" src="${item.picture.large}" alt="${item.name.first} ${item.name.last}">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                            <p class="card-text">${item.email}</p>
                            <p class="card-text cap">${item.location.city}, ${item.location.state} ${item.nat}</p>
                        </div>
                    </div>`;
        listenForClick(item);
        return html;
    }).join('');
    gallery.innerHTML = people;
}

/**
 * Creates the modal appends to the page and
 * adds a click event to the close button
 * @param {object} item - data on individual user 
 */
function createModal(item) {
    const div = document.createElement('div');
    const dob = GetFormattedDate(item.dob.date);

    // Template for modal
    div.className = 'modal-container';
    const html = `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${item.picture.large}" alt="${item.name.first} ${item.name.last}">
                        <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                        <p class="modal-text">${item.email}</p>
                        <p class="modal-text cap">${item.location.city} | ${item.location.coordinates.latitude}, ${item.location.coordinates.longitude}</p>
                        <hr>
                        <p class="modal-text">Cell: ${item.cell}</p>
                        <p class="modal-text cap">Address: ${item.location.street}, ${item.location.city}, ${item.location.state} ${item.location.postcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
                    </div>
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>`;
    div.innerHTML = html;
    document.querySelector('body').appendChild(div);

    // Adds event listener for close button
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', e => {
        div.remove();
    });
}

/**
 * 
 * @param {object} data - data from API call 
 */
function listenForClick(data) {
    setTimeout(event => {
        const person = document.getElementById(`${data.name.first}${data.name.last}`);
        person.addEventListener('click', e => {
            createModal(data);
        });
    },100)
}

/**
 * Formats the date for more readablity
 * @param {string} date - Date of birth to be formated
 * @return {string} - formated date
 */
function GetFormattedDate(date) {
    var birthday = new Date(date);
    var month = birthday.getMonth() + 1;
    var day = birthday.getDate();
    var year = birthday.getFullYear();
    return month + "/" + day + "/" + year;
}
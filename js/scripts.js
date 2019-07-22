const gallery = document.getElementById('gallery');

/**
 * uses fetch to grab 12 users for the page
 * then calls the appendUsers function
 */
function getUsers() {
    fetch('https://randomuser.me/api/?results=12&nat=gb,us,nz,au')
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
        listenForClick(item, data, index);
        return html;
    }).join('');
    gallery.innerHTML = people;
}

/**
 * Creates the modal appends to the page and
 * adds a click event to the close button and prev and next buttons
 * @param {object} item - data on individual user 
 */
function createModal(item, data, index) {
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
    
    // disables next or prev button if 0 or 11
    if (index >= 11) {
        document.getElementById('modal-next').disabled= true;
    } else {
        document.getElementById('modal-next').disabled = false;
    }

    if (index <= 0) {
        document.getElementById('modal-prev').disabled = true;
    } else {
        document.getElementById('modal-prev').disabled = false;
    }

    // Adds event listener for close button
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', e => {
        div.remove();
    });

    // Click event for next button
    document.getElementById('modal-next').addEventListener('click', e => {
        div.remove();
        nextUser(data, index)
    })
    
    // Click event for prev button
    document.getElementById('modal-prev').addEventListener('click', e => {
        div.remove();
        prevUser(data, index)
    })
}

/**
 * Shows next user
 * @param {object} data 
 * @param {number} index 
 */
function nextUser(data, index) {
    let item = data[index += 1];
    createModal(item, data, index);
    if (index >= 11) {
        document.getElementById('modal-next').disabled = true;
    } else {
        document.getElementById('modal-next').disabled = false;
    }
}

/**
 * Shows previous user
 * @param {object} data 
 * @param {number} index 
 */
function prevUser(data, index) {
    let item = data[index -= 1];
    createModal(item, data, index);
    if (index <= 0) {
        document.getElementById('modal-prev').disabled = true;
    } else {
        document.getElementById('modal-prev').disabled = false;
    }
}

/**
 * 
 * @param {object} data - data from API call 
 */
function listenForClick(item, data, index) {
    setTimeout(event => {
        const person = document.getElementById(`${item.name.first}${item.name.last}`);
        person.addEventListener('click', e => createModal(item, data, index));
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

function appendSearch() {
    // Creates and appends form
    const container = document.querySelector('.search-container');
    const form = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                </form>`;
    container.innerHTML = form;
    
    // Adds event listener for form
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        console.log(e.target[0].value)
        e.target[0].value = '';
    });
}

appendSearch();
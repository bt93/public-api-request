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

function appendUsers(data) {
    console.log(data)
}
let form = document.getElementById('event-form');
let eventInput = document.getElementById('event-name');
let dateInput = document.getElementById('event-date');
let timeInput = document.getElementById('event-time');
let locationInput = document.getElementById('event-location');
let descriptionInput = document.getElementById('event-description');
let categoryInput = document.getElementById('event-category');
let eventList = document.getElementById('events-ul');
let allEventsContainer = document.getElementById('all-events-container');
let removeAllBtn = document.getElementById('remove-all-events');

let events = [];

function renderEvents() {
    eventList.innerHTML = '';
    events.forEach((event, index) => {
        let li = document.createElement('li');
        li.classList.add('event-item');
        li.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        eventList.appendChild(li);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let newEvent = {
        name: eventInput.value,
        date: dateInput.value,
        time: timeInput.value,
        location: locationInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
    };
    events.push(newEvent);
    renderEvents();
    form.reset();
});

eventList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        let index = event.target.getAttribute('data-index');
        events.splice(index, 1); 
        renderEvents(); 
    }
});

removeAllBtn.addEventListener('click', () => {
    events = [];
    renderEvents(); 
});



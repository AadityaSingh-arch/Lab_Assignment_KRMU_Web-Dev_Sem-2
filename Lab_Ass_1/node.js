// ===== GET FORM AND INPUT ELEMENTS =====
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

// below is the really basic way to store events, we will learn about better ways to do this in future lessons
let events = [];

// ===== FUNCTION TO RENDER EVENTS =====
function renderEvents() {
    // clear the current list
    eventList.innerHTML = '';
    // loop through events and create list items
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

// ===== EVENT LISTENER FOR FORM SUBMISSION =====
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form from submitting normally
    // create event object from form inputs
    let newEvent = {
        name: eventInput.value,
        date: dateInput.value,
        time: timeInput.value,
        location: locationInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
    };
    // add new event to events array
    events.push(newEvent);
    // re-render the event list
    renderEvents();
    // reset the form
    form.reset();
});

// ===== EVENT LISTENER FOR REMOVING INDIVIDUAL EVENTS =====
eventList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        let index = e.target.getAttribute('data-index');
        events.splice(index, 1); // remove event from array
        renderEvents(); // re-render the event list
    }
});

// ===== EVENT LISTENER FOR REMOVING ALL EVENTS =====
removeAllBtn.addEventListener('click', () => {
    events = []; // clear the events array
    renderEvents(); // re-render the event list
});


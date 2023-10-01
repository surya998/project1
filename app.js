// Get references to HTML elements
const createForm = document.getElementById('create-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const notesList = document.getElementById('notes');

// Store notes in an array (for simplicity)
const notes = [];

// Function to add a new note
function addNote(title, content) {
    const newNote = {
        title,
        content,
    };
    notes.push(newNote);
    displayNotes();
}

// Function to display notes on the web page
function displayNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
            <div class="note-card">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesList.appendChild(noteItem);
    });
}

// Function to edit a note
function editNote(index) {
    const editedTitle = prompt('Edit Title:', notes[index].title);
    const editedContent = prompt('Edit Content:', notes[index].content);
    notes[index].title = editedTitle;
    notes[index].content = editedContent;
    displayNotes();
}

// Function to delete a note
function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        displayNotes();
    }
}

// Event listener for form submission
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = noteTitle.value;
    const content = noteContent.value;
    addNote(title, content);
    noteTitle.value = '';
    noteContent.value = '';
});

function loadNotes() {
    fetch('notes.json')
        .then((response) => response.json())
        .then((data) => {
            // Assign the loaded notes to the 'notes' array
            notes.length = 0; // Clear the existing notes
            notes.push(...data);
            displayNotes();
        })
        .catch((error) => {
            console.error('Error loading notes:', error);
        });
}

// Function to save notes to the JSON file
function saveNotes() {
    fetch('notes.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notes),
    })
        .then(() => {
            console.log('Notes saved successfully.');
        })
        .catch((error) => {
            console.error('Error saving notes:', error);
        });
}

// Initial display of notes
displayNotes();

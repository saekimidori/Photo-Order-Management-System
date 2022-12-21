const addNote = document.querySelector('#addNote')
const form = document.querySelector('#form')

addNote.addEventListener('click', newNote)

function newNote() {
        form.classList.toggle('hidden')
}

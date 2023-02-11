///// Buttons
const searchBtn = document.querySelector('#searchBtn')
const addNote = document.querySelector('#addNote')
const updateNoteBtn = document.querySelector('#updateNoteBtn')
const resolvedBtn = document.querySelectorAll('.resolved')
const editBtn = document.querySelectorAll('.edit')
const deleteBtn = document.querySelectorAll('.delete')

///// Forms
const form = document.querySelector('#form')
const editForm = document.querySelector('#editForm')

///// Click events
searchBtn.addEventListener('click', search)
addNote.addEventListener('click', newNote)
updateNoteBtn.addEventListener('click', updateNote)
Array.from(resolvedBtn).forEach((element)=>{
    element.addEventListener('click', markResolved)
})
Array.from(editBtn).forEach((element)=>{
    element.addEventListener('click', displayEditForm)
})
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteNote)
})

// function to display form for adding a new note
function newNote() {
    form.classList.toggle('hidden')
    // Changes the 'Add new note' button text to 'Cancel' to hide the form
    if (addNote.innerHTML === 'Add new note') {
        addNote.innerHTML = 'Cancel new note'
    } else {
        addNote.innerHTML = 'Add new note'
    }
}

function displayEditForm() {
    editForm.classList.toggle('hidden')
    async (req, res) => {
            Note.findById(req.params.noteId)
            .then(note => {
                if(!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });            
                }
                res.send(note);
                editForm.innerHTML = req.body
            })
    }
}

async function search(){
    const itemText = this.parentNode.dataset.id
    try{
        const response = await fetch('workspace/search', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
    
async function markResolved(){
      const itemText = this.parentNode.dataset.id
      try{
          const response = await fetch('workspace/markResolved', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  'itemFromJS': itemText
              })
            })
          const data = await response.json()
          console.log(data)
          location.reload()
  
      }catch(err){
          console.log(err)
      }
}

async function updateNote(){
    const itemText = this.parentNode.parentNode.dataset.id
    console.log(itemText)
    // updateNote.classList.toggle('hidden')
    try{
        const response = await fetch('workspace/:noteId/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteNote(){
    const itemText = this.parentNode.dataset.id
    try{
        const response = await fetch('workspace/deleteNote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()    
    }catch(err){
        console.log(err)
    }
}
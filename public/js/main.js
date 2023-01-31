const addNote = document.querySelector('#addNote')
const updateNoteBtn = document.querySelector('#updateNoteBtn')
const resolvedBtn = document.querySelectorAll('.resolved')
const editBtn = document.querySelectorAll('.edit')
const deleteBtn = document.querySelectorAll('.delete')
const form = document.querySelector('#form')
const editForm = document.querySelector('#editForm')



addNote.addEventListener('click', newNote)

updateNoteBtn.addEventListener('click', updateNote)

function newNote() {
    form.classList.toggle('hidden')
}

function editNote() {
    editForm.classList.toggle('hidden')
}

Array.from(resolvedBtn).forEach((element)=>{
    element.addEventListener('click', markResolved)
})

Array.from(editBtn).forEach((element)=>{
    element.addEventListener('click', editNote)
})

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteNote)
})
    
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
    const itemText = this.parentNode.dataset.id
    // updateNote.classList.toggle('hidden')
    try{
        const response = await fetch('workspace/editNote', {
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
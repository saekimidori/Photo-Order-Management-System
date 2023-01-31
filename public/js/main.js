const addNote = document.querySelector('#addNote')
const resolvedBtn = document.querySelectorAll('.resolved')
const deleteBtn = document.querySelectorAll('.delete')
const form = document.querySelector('#form')

addNote.addEventListener('click', newNote)

function newNote() {
        form.classList.toggle('hidden')
}

Array.from(resolvedBtn).forEach((element)=>{
        element.addEventListener('click', markResolved)
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
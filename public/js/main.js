const addNote = document.querySelector('#addNote')
const deleteBtn = document.querySelectorAll('.resolved')
const form = document.querySelector('#form')

addNote.addEventListener('click', newNote)

function newNote() {
        form.classList.toggle('hidden')
}

Array.from(deleteBtn).forEach((element)=>{
        element.addEventListener('click', deleteNote)
    })
    

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

async function markComplete(){
      const itemText = this.parentNode.childNodes[1].innerText
      try{
          const response = await fetch('markComplete', {
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
///// Buttons
// const searchBtn = document.querySelector('#searchBtn')
const addNote = document.querySelector('#addNote')
// const updateNoteBtn = document.querySelector('#updateNoteBtn')
// const resolvedBtn = document.querySelectorAll('.resolved')
// const editBtn = document.querySelectorAll('.edit')
// const deleteBtn = document.querySelectorAll('.delete')
const productDetailsBtn = document.querySelector('#product-details-btn')
const completeEnvelopeBtn = document.querySelector('#complete-envelope-btn')
const createExceptionBtn = document.querySelector('#create-exception-btn')
const envelopeHistoryBtn = document.querySelector('#envelope-history-btn')
const addNoteBtn = document.querySelector('#add-note-btn')

const selectElement = document.querySelector(".order-tabs");
const orderView = document.querySelector(".order-view");

selectElement.addEventListener("change", (event) => {
  orderView.textContent = `<%- include('partials/${event.target.value}') -%>`
});

///// Forms
const form = document.querySelector('#form')
// const editForm = document.querySelector('#editForm')

// order views
const productDetails = document.querySelector('#product-details')
const completeEnvelope = document.querySelector('#complete-envelope')
const createException = document.querySelector('#create-exception')
const envelopeHistory = document.querySelector('#envelope-history')
const newOrderNote = document.querySelector('#new-order-note')

///// Click events
// searchBtn.addEventListener('click', search)
addNote.addEventListener('click', newNote)
// updateNoteBtn.addEventListener('click', updateNote)
// Array.from(resolvedBtn).forEach((element)=>{
//     element.addEventListener('click', markResolved)
// })
// Array.from(editBtn).forEach((element)=>{
//     element.addEventListener('click', displayEditForm)
// })
// Array.from(deleteBtn).forEach((element)=>{
//     element.addEventListener('click', deleteNote)
// })
productDetailsBtn.addEventListener('click', toggleProductDetails)
completeEnvelopeBtn.addEventListener('click', toggleCompleteEnvelope)
createExceptionBtn.addEventListener('click', toggleCreateException)
envelopeHistoryBtn.addEventListener('click', toggleEnvelopeHistory)
addNoteBtn.addEventListener('click', toggleOrderNoteForm)

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

function toggleProductDetails() {
    productDetails.classList.toggle('hidden')
    completeEnvelope.classList.add('hidden')
    createException.classList.add('hidden')
    envelopeHistory.classList.add('hidden')
    newOrderNote.classList.add('hidden')
}

function toggleCompleteEnvelope() {
    completeEnvelope.classList.toggle('hidden')
    productDetails.classList.add('hidden')
    createException.classList.add('hidden')
    envelopeHistory.classList.add('hidden')
    newOrderNote.classList.add('hidden')
}

function toggleCreateException() {
    createException.classList.toggle('hidden')
    productDetails.classList.add('hidden')
    completeEnvelope.classList.add('hidden')
    envelopeHistory.classList.add('hidden')
    newOrderNote.classList.add('hidden')
}

function toggleEnvelopeHistory() {
    envelopeHistory.classList.toggle('hidden')
    productDetails.classList.add('hidden')
    completeEnvelope.classList.add('hidden')
    createException.classList.add('hidden')
    newOrderNote.classList.add('hidden')
}

function toggleOrderNoteForm() {
    newOrderNote.classList.toggle('hidden')
    envelopeHistory.classList.add('hidden')
    productDetails.classList.add('hidden')
    completeEnvelope.classList.add('hidden')
    createException.classList.add('hidden')
}

// function displayEditForm() {
//     editForm.classList.toggle('hidden')
//     async (req, res) => {
//             Note.findById(req.params.noteId)
//             .then(note => {
//                 if(!note) {
//                     return res.status(404).send({
//                         message: "Note not found with id " + req.params.noteId
//                     });            
//                 }
//                 res.send(note);
//                 editForm.innerHTML = req.body
//             })
//     }
// }

// async function search(){
//     const itemText = this.parentNode.dataset.id
//     try{
//         const response = await fetch('workspace/search', {
//             method: 'get',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'itemFromJS': itemText
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }
    
// async function markResolved(){
//       const itemText = this.parentNode.dataset.id
//       try{
//           const response = await fetch('workspace/markResolved/:id', {
//               method: 'put',
//               headers: {'Content-Type': 'application/json'},
//               body: JSON.stringify({
//                   'itemFromJS': itemText
//               })
//             })
//           const data = await response.json()
//           console.log(data)
//           location.reload()
  
//       }catch(err){
//           console.log(err)
//       }
// }

// async function updateNote(){
//     const itemText = this.parentNode.parentNode.dataset.id
//     console.log(itemText)
//     // updateNote.classList.toggle('hidden')
//     try{
//         const response = await fetch('workspace/:id', {
//             method: 'get',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'itemFromJS': itemText
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }

// // async function findOne() {
// //     console.log(req.params.noteId)
// //     try {
// //     Note.findById(req.params.noteId)
// //     .then(note => {
// //         if(!note) {
// //             return res.status(404).send({
// //                 message: "Note not found with id " + req.params.noteId
// //             });            
// //         }
// //         res.send(note);
// //     }).catch(err => {
// //         if(err.kind === 'ObjectId') {
// //             return res.status(404).send({
// //                 message: "Note not found with id " + req.params.noteId
// //             });                
// //         }
// //         return res.status(500).send({
// //             message: "Error retrieving note with id " + req.params.noteId
// //         });
// //     });
// // }
// // },

// async function deleteNote(){
//     const itemText = this.parentNode.dataset.id
//     try{
//         const response = await fetch('workspace/deleteNote', {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'itemFromJS': itemText
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()    
//     }catch(err){
//         console.log(err)
//     }
// }
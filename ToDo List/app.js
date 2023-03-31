const formCreate = document.querySelector('#form-create')
const modalForm = document.querySelector('.modal-form')
const inputEdit = document.querySelector('.input-edit')
const listGroupTodo = document.querySelector('.list-group')

const modal = document.querySelector('#modal')
const overlay = document.querySelector('.overlay')

const fullDay = document.querySelector('.full-day')
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const close = document.querySelector('.close')

let editNewVal

// Check
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) {
    showToDo()
}

// Set Todo
function setTodo() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// Function for Time
function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()

    const hour = now.getHours() < 10 ? '0' + (now.getHours()) : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + (now.getMinutes()) : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + (now.getSeconds()) : now.getSeconds()

    const months = [
        'January',
        'February',
        'March',
        'Aprel',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const month_title = now.getMonth()

    fullDay.textContent = `
    ${date} ${months[month_title]} ${year}
    `
    hourEl.textContent = hour
    minuteEl.textContent = minute
    secondEl.textContent = second

    return `${hour}:${minute}:${second},${date} ${month} ${year}`;
}
getTime()

setInterval(() => {
    getTime()
}, 1000)

// Get Todo
function showToDo() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ""

    todos.forEach((item, index) => {
        listGroupTodo.innerHTML += `
        <li ondblclick = (did(${index})) class="list-group-item d-flex justify-content-between ${item.complited == true ? 'complited' : ''}">
        ${item.text}
        <div class="icons">
          <span class="opacity-50 me-2">${item.time}</span>
          <img onclick = (editor(${index})) src="./img/edit.svg" alt="Just Image" width="25" height="25"/>
          <img onclick=(deleteToDo(${index})) src="./img/delete.svg" alt="Just Image" width="25" height="25"/>
        </div>
      </li>
        `
    })
}

// Function for message
function showMes(where, message) {
    document.querySelector(`#${where}`).textContent = message

    setTimeout(() => {
        document.querySelector(`#${where}`).textContent = ''
    }, 5000)
}


// Form Part
formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputVal = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (inputVal.length) {
        todos.push({ text: inputVal, time: getTime(), complited: false })
        setTodo()
        showToDo()
    } else {
        showMes('message-create', 'Please! Write something input...')
    }
})

function deleteToDo(del) {
    const deleted = todos.filter((item, index) => {
        return index !== del
    })
    todos = deleted
    setTodo()
    showToDo()
}

function did(del) {
    const completed = todos.map((item,index) =>{
        if(del == index){
            return {...item, complited: item.complited == true ? false : true}
        }else{
            return {...item}
        }
    })
    todos = completed
    setTodo()
    showToDo()
}

modalForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const inputVal = modalForm['input-edit'].value.trim()
    modalForm.reset()
    if (inputVal.length) {
        todos.splice(editNewVal, 1,{
            text:inputVal,
            time:getTime(),
            complited:false,
        })
        setTodo()
        showToDo()
        closeModal()
    } else {
        showMes('modal-edit', 'Please! Write something input...')
    }
})

overlay.addEventListener('click', closeModal)
close.addEventListener('click', closeModal)
document.addEventListener('keydown', (e) =>{
    if(e.which == 27){
        closeModal()
    }
})

function editor (edit) {
    open()
    editNewVal = edit
}

function open (){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function closeModal (){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
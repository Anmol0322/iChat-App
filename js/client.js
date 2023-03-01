const socket = io.connect('http://localhost:8000');

//Get DOM elements in respective Js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Function which will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

//Ask new user for his/her name and let the server know
const name = prompt("enter your name to join");
if(name != null)
    socket.emit('new-user-joined', name) ;

//if a new user joins, receive his/her from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

//if server send a msg, receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

//if a user leaves the chat, append the info to  the container
socket.on('left', name => {
    if(name != null)
        append(`${name} left the chat`, 'left')
})


//if the form get submitted, send server the msg
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ''; 
})
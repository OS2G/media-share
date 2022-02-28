var readline = require('readline');
const io = require("socket.io-client");

const socket = io("ws://127.0.0.1:8080");

socket.on("connect", ()=>{
  console.log(`Connected to the server as ${socket.id}`);
});

socket.on("message", text =>{
  const json = JSON.parse(text);
  if(json.socket == socket.id) return;
	console.log(`${json.socket}> ${json.message.message}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
   socket.emit("message", {message: line});
});
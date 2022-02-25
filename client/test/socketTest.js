var readline = require('readline');
const io = require("socket.io-client");

const socket = io("ws://127.0.0.1:8080");

socket.on("message", text =>{
	console.log(`SERVER> ${text}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
   socket.emit("message", {message: line});
});

console.log("Connected to the server");
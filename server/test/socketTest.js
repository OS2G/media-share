const io = require("socket.io")();

io.on("connection", (socket) => {
	console.log(`JOIN> ${socket.id}`);
	socket.on("message", message => {
		console.log(`${socket.id}> ${JSON.stringify(message)}`);
		io.emit("message", `${JSON.stringify({
			socket: socket.id,
			message: message 
		})}`);
	});
});

io.listen(8080);
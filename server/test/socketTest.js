const io = require("socket.io")();

io.on("connection", (socket) => {
	console.log("CLIENT> JOIN");
	socket.on("message", message => {
		console.log(`CLIENT> ${JSON.stringify(message)}`);
		io.emit("message", `${message}`);
	});
});

io.listen(8080);
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');
const { ExpressPeerServer } = require("peer");

const config = require("./config.json");

app.use(cors());

app.set("view engine", "ejs");
app.use("/assets/bootstrap", express.static(__dirname+"/node_modules/bootstrap/dist"));
app.use("/assets/peerjs", express.static(__dirname+"/node_modules/peerjs/dist"));
app.use(express.static("public"));

const peerServer = new ExpressPeerServer(server, {
	path: config.signal.path
});
app.use(peerServer);

app.get("/", (request, response) => {
	response.render("index");
});

app.get("/room/", (request, response) => {
	response.redirect(`/room/${uuidv4()}`);
});

app.get("/room/:roomID/", (request, response) => {
	response.render("room", {
		roomID: request.params.roomID,
		config: {
			signal: {
				port: config.web.port,
				path: config.signal.path
			}
		},
	});
});

io.on("connection", socket => {
	socket.on("join-room", (roomID, userID) => {
		socket.join(roomID);
		socket.to(roomID).emit("user-connected", userID);
	});""
});

server.listen(8080); // Change to Config

import { Server } from "socket.io";

export class Server{
	constructor(){
		this.#_io = new Server();
		this.#_clients = [];
	}

	async receive(socket, message){

	}

	async send(socket, message){

	}

	async sendAll(message){
	}

	start(port=8080){
		this.#_io.on("connection", (socket) => {
			console.log(`JOIN> ${socket.id}`);
			this.#_clients.push(socket);
			socket.on("message", async message => {
				console.log(`${socket.id}> ${JSON.stringify(message)}`);
				this.receive(socket, message);
			});
		});
		this.#_io.listen(port);
	}
}
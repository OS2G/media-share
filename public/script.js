const socket = io("/");
const myPeer = new Peer(undefined, {
	host: "/",
	port: 8081
});

myPeer.on("open", id => {
	socket.emit("join-room", ROOM_ID, id);
});


// Once we get a call, we answer and use that stream.
myPeer.on("call", call => {
	call.answer();

	const myVideo = document.getElementById("video");
	call.on("stream", userVideoStream => {
		fnAddVideoStream(video, userVideoStream);
	});
});

document.getElementById("broadcast-start").onclick = function (){
	const myVideo = document.getElementById("video");
	myVideo.mute = true;

	const myChatLog = document.getElementById("chatlog")

	navigator.mediaDevices.getDisplayMedia({
		video: true,
		audio: true
	}).then(stream => {
		fnAddVideoStream(myVideo, stream);

		// Handle when user connects after the stream.
		socket.on("user-connected", userID => {
			fnAddConnection(userID, stream); // Send the user my video stream
			myChatLog.value += `---- ${userID} has joined the party ----\n`;
		});
	}).catch(error => console.log(error));
};

function fnAddConnection(userID, stream){
	const call = myPeer.call(userID, stream);
	const video = document.getElementById("video");
	// call.on("stream", userVideoStream => {
	// 	fnAddVideoStream(video, userVideoStream);
	// });
	// call.on("close", () => { video.remove(); });
}

function fnAddVideoStream(video, stream){
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", () =>{
		video.play();
	});
}
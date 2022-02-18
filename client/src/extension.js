document.body.style.border = "5px solid red";

function init(){
	if(!$("video")){
		console.err("Could not find video");
	}

	$("video").on("play", async (e) =>{
		console.log("playing");
	});

	$("video").on("pause", async (e) =>{
		console.log("pause");
	});

	$("video").on("timeupdate", async (e) => {
		console.log("update");
	});
}

$(function(){
	console.log("Loaded Media Share");
	setTimeout(init(), 5000);
});
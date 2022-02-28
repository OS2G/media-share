$(function(){
	$("#test").click(()=>{
		console.log("Test");
	})
});

function saveState(){
	console.log("State Save");
}

function loadPopup(){
	console.log("Loaded State");
}

$(function(){
	loadPopup();
	$("#btnServerStart").on("click", function(){
		let label = $("label[for='btnServerStart']");
		if($("#btnServerStart").is(":checked")){
			label.removeClass("btn-success");
			label.addClass("btn-danger");
			label.text("Stop Server");
		}else{
			label.removeClass("btn-danger");
			label.addClass("btn-success");
			label.text("Start Server");
		}

		saveState();
	})
});
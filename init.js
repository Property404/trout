// Remove loading screen
trout.onFinishLoading(()=>
	document.getElementById("initial-loading-screen").remove()
);

document.getElementById("loading-subtext").textContent = "preparing first scene";

// Load first scene
trout.setPrimaryScene("ExampleScene");

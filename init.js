// Remove loading screen
trout.onFinishLoading(()=>
	document.getElementById("initial-loading-screen").remove()
);

// Load first scene
trout.setPrimaryScene("FirstScene");

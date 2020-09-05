/* Initialization code */
{
	// Remove loading screen
	trout.onFinishLoading(()=>
		document.getElementById("initial-loading-screen").remove()
	);


	// Load first scene
	const url_params = new URLSearchParams(window.location.search);
	const scene = url_params.get("scene") || "Home";
	document.getElementById("loading-subtext").textContent =
		"preparing first scene";
	trout.setPrimaryScene(scene);
}

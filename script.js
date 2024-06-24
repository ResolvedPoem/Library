window.onload = (event) => {
//in case I want to make something run at launch
	var searchParams = new URLSearchParams(window.location.search);
	if(searchParams.size == 0) {
		const paramStr = "";
		searchParams = new URLSearchParams(paramStr);
	}
	console.log(searchParams);
	let linkDiv = document.getElementById("links");
	// for (const [key, value] of searchParams) {
	// 	let link = document.getElementById(key.replace(/[0-9]/g, ''));
	// 	console.log(key.replace(/\D/g, ""));
	// 	if(value) {
	// 		link.href = "";
	// 	} else {
	// 		link.href = "";
	// 	}
	// }
	for(link of linkDiv.children) {
		link.href += `?${searchParams.toString()}`;
	}
}


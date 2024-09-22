const getScreenPPI = () => {
	const tempDiv = document.createElement("div");
	tempDiv.style.width = "1in";
	tempDiv.style.height = "auto"; // Height is irrelevant for this calculation

	document.body.appendChild(tempDiv);
	return tempDiv.clientWidth;
};

export const realSizeToPixels = (realLifeCm) => {
	const realLifeInches = realLifeCm / 2.54; // Convert cm to inches
	const ppi = getScreenPPI(); // Get the screen's PPI
	return realLifeInches * ppi; // Convert inches to pixels
};

const getDimensions = (dimensions) => {
	let cleanedDimensions = dimensions.replace(/cm/g, "");

	if (dimensions.includes(",")) {
		cleanedDimensions = cleanedDimensions.split(",")[0];
	} else if (dimensions.includes(":")) {
		cleanedDimensions = cleanedDimensions.split(":")[1];
	}

	if (cleanedDimensions.includes("(")) {
		cleanedDimensions = cleanedDimensions.split("(")[0];
	}

	const regex = /[^0-9.]+/g; // Matches anything that is not a digit or a period

	cleanedDimensions = cleanedDimensions.split(regex);

	cleanedDimensions = cleanedDimensions.filter(
		(str) => str !== "" && str !== " "
	);

	const centimers = {};
	centimers.height = Number(cleanedDimensions[0]);
	centimers.width = Number(cleanedDimensions[1]);

	return centimers;
};

export const analyzeData = (data) => {
	const onView = [];
	const notOnView = [];

	const analyzedData = data.map((d) => {
		// get clean dimensions
		if (!d.dimensions.length) {
			return;
		}
		d.cleanedDimensions = getDimensions(d.dimensions[0]);
		if (d.onView) {
			onView.push(d);
		} else {
			notOnView.push(d);
		}
		return d;
	});
	return { analyzedData, onView, notOnView };
};

// const onViewChecked = document.getElementById("onView");
// const notOnViewChecked = document.getElementById("notOnView");

// let imagesToRender = analyzedData;
// let renderOnView = true;
// let renderNotOnView = true;

// // Add an event listener for the checkbox change events
// onViewChecked.addEventListener("change", function () {
// 	if (onViewChecked.checked) {
// 		renderOnView = true;
// 		console.log("Checkbox is checked");
// 	} else {
// 		renderOnView = false;
// 		console.log("Checkbox is unchecked");
// 	}
// });

// notOnViewChecked.addEventListener("change", function () {
// 	if (notOnViewChecked.checked) {
// 		renderNotOnView = true;
// 		console.log("Checkbox is checked");
// 	} else {
// 		renderNotOnView = false;
// 		console.log("Checkbox is unchecked");
// 	}
// });

// if (renderOnView && renderNotOnView) {
// 	imagesToRender = analyzedData;
// } else if (renderNotOnView && !renderOnView) {
// 	imagesToRender = notOnView;
// } else if (!renderNotOnView && renderOnView) {
// 	imagesToRender = onView;
// }

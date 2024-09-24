const getScreenPPI = () => {
	const tempDiv = document.createElement("div");
	tempDiv.style.width = "1in";
	tempDiv.style.height = "auto";

	document.body.appendChild(tempDiv);
	return tempDiv.clientWidth;
};

export const realSizeToPixels = (realLifeCm) => {
	const realLifeInches = realLifeCm / 2.54; // Convert cm to inches
	const ppi = getScreenPPI(); // Get the screen's PPI
	return realLifeInches * ppi; // Convert inches to pixels
};

const getDimensions = (dimensions, id) => {
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

	// these have the dimensions recorded in the wrong order
	if (
		id === "ld1-1643399756728-1643399770256-0" ||
		id === "ld1-1643399756728-1643399787739-0" ||
		id === "ld1-1643399756728-1643399773325-0"
	) {
		centimers.width = Number(cleanedDimensions[0]);
		centimers.height = Number(cleanedDimensions[1]);
	} else if (id === "ld1-1643399756728-1643399767617-0") {
		const diameter = Math.max(
			Number(cleanedDimensions[0]),
			Number(cleanedDimensions[1])
		);
		centimers.height = diameter;
		centimers.width = diameter;
	}

	return centimers;
};

export const analyzeData = (data) => {
	const analyzedData = data.map((d) => {
		if (!d.dimensions.length) {
			return;
		}
		d.cleanedDimensions = getDimensions(d.dimensions[0], d.id);
		return d;
	});
	return { analyzedData };
};

// TODO - add in future

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

/**
 * 				<!-- <div class="checkboxes-div">
					<div>
						<input type="checkbox" id="onView" class="checkbox" checked />
						<label for="scales">On View</label>
					</div>
					<div>
						<input type="checkbox" id="notOnView" class="checkbox" checked />
						<label for="horns">Not On View</label>
					</div>
				</div> -->
 */

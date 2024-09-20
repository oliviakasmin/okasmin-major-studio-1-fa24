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
	const analyzedData = data.map((d) => {
		// get clean dimensions
		if (!d.dimensions.length) {
			return;
		}
		d.cleanedDimensions = getDimensions(d.dimensions[0]);
		return d;
	});
	return analyzedData;
};

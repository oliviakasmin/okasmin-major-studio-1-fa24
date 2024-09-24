const getData = async () => {
	const data = await d3.json("data_all_dims.json");
	return data;
};

// util functions
const getScreenPPI = () => {
	const tempDiv = document.createElement("div");
	tempDiv.style.width = "1in";
	tempDiv.style.height = "auto";

	document.body.appendChild(tempDiv);
	return tempDiv.clientWidth;
};

const realSizeToPixels = (realLifeCm) => {
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

const analyzeData = (data) => {
	const analyzedData = data.map((d) => {
		if (!d.dimensions.length) {
			return;
		}
		d.cleanedDimensions = getDimensions(d.dimensions[0], d.id);
		return d;
	});
	return { analyzedData };
};

// modal functions
const openModal = () => {
	d3.select("#modal-2").classed("open", true);
	d3.select("body").classed("jw-modal-open", true);
};

const closeModal = () => {
	d3.select(".jw-modal.open").classed("open", false);
	d3.select("#modal-2").classed("open", false);
	d3.select("body").classed("jw-modal-open", false);
};

const provideModalContent = (d) => {
	const { imageResources, name } = d;
	const highResTiffObj = imageResources.find((d) => d.label === "Screen Image");
	const artistName = name.find((d) => d.label === "Artist").content;
	const { title, cleanedDimensions, link } = d;

	d3.select("#modal-title").text(`${title} by ${artistName}`);
	d3.select("#modal-dims").text(
		`${cleanedDimensions.width} x ${cleanedDimensions.height}cm`
	);
	d3.select("#modal-link").attr("href", link);

	const realHeightPx = realSizeToPixels(d.cleanedDimensions.height);
	const realWidthPx = realSizeToPixels(d.cleanedDimensions.width);

	d3.select("#modal-image")
		.attr("src", highResTiffObj.url)
		.attr("height", realHeightPx)
		.attr("width", realWidthPx)
		.attr("class", "modal-image");
};

// add grid of images function
const createGrid = (analyzedData, widthLeftColumn, margin) => {
	const gridDiv = d3.select(".grid");
	gridDiv
		.attr("width", screen.width - widthLeftColumn)
		.style("margin-left", `${widthLeftColumn + margin.left}px`);
	gridDiv
		.selectAll("div")
		.data(analyzedData)
		.join("div")
		.attr("class", "grid-item")
		.append("img")
		.attr("src", (d) => d.thumbnail)
		.attr("alt", (d) => d.link)
		.attr("class", "grid-item")
		.attr("height", (d) => `${d.cleanedDimensions.height}px`)
		.attr("width", (d) => `${d.cleanedDimensions.width}`)
		.on("click", (event, d) => {
			provideModalContent(d);
			openModal();
			event.stopPropagation();
		});

	// modal close
	d3.select("#close-button").on("click", (event) => {
		closeModal();
		event.stopPropagation();
	});
};

// save data to local storage
const setDataStorage = async () => {
	const data = await getData();
	const { analyzedData } = analyzeData(data);

	if (!localStorage.getItem("data")) {
		localStorage.setItem("data", JSON.stringify(analyzedData));
	}
};

setDataStorage();

const analyzedData = JSON.parse(localStorage.getItem("data"));

// style left column
const margin = { left: 20 };
const widthLeftColumn = 120;

const leftColumnDiv = d3.select(".left-column");
leftColumnDiv
	.style("width", `${widthLeftColumn + margin.left}px`)
	.style("background-color", "black");

// style person
const personHeight = 167.64; //5.5 ft = 167.64 cm

const personSvg = d3.select(".person");
personSvg
	.attr("height", personHeight)
	.attr(
		"alt",
		`Person standing by Kris.27 from <a href="https://thenounproject.com/browse/icons/term/person-standing/" target="_blank" title="Person standing Icons">Noun Project</a> (CC BY 3.0)`
	);

d3.select(".person-label").text("5.5ft").attr("width", personHeight);

const personDiv = d3.select(".person-div");
personDiv.style("width", "100px").style("margin-left", `${margin.left}px`);

// create grid visualization
createGrid(analyzedData, widthLeftColumn, margin);

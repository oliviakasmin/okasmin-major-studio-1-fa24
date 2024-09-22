import * as d3 from "d3";
import { realSizeToPixels } from "./utils";

const openModal = () => {
	d3.select("#my-modal").classed("closed", false);
	d3.select("#my-modal-overlay").classed("closed", false);

	d3.select(".person").classed("closed", true);
};

const closeModal = () => {
	d3.select("#my-modal").classed("closed", true);
	d3.select("#my-modal-overlay").classed("closed", true);

	d3.select(".person").classed("closed", false);
};

const provideModalContent = (d) => {
	const divModal = d3.select("#my-modal");

	const { imageResources, name } = d;
	const highResTiffObj = imageResources.find((d) => d.label === "Screen Image");
	const artistName = name.find((d) => d.label === "Artist").content;

	const itemText = `Title: ${d.title}
	\nDimensions: ${d.dimensions[0]}
	\nLink: ${d.link}
	\nMedium: ${d.medium}
	\nartist: ${artistName}
	`;

	divModal.select("p").text(itemText);

	console.log(d);

	const realHeightPx = realSizeToPixels(d.cleanedDimensions.height);
	const realWidthPx = realSizeToPixels(d.cleanedDimensions.width);

	divModal
		.select("img")
		.attr("src", highResTiffObj.url)
		.attr("height", realHeightPx)
		.attr("width", realWidthPx);
};

export const createGrid = (analyzedData, widthLeftColumn, margin) => {
	// add modal
	const divModalOverlay = d3.select("#my-modal-overlay");
	divModalOverlay.classed("closed", true);

	const divModal = d3.select("#my-modal");
	divModal.classed("closed", true).style("background-color", "black");

	divModal
		.append("button")
		.attr("class", "close-button")
		.attr("id", "close-button")
		.text("x");
	divModal.append("div").attr("class", "modal-guts").append("p");
	divModal.append("img").attr("class", "modal-image");

	divModal.select("#close-button").on("click", (event) => {
		closeModal();
		event.stopPropagation();
	});

	// add grid of images
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
		.attr("class", "grid-item")
		.attr("height", (d) => `${d.cleanedDimensions.height}px`)
		.attr("width", (d) => `${d.cleanedDimensions.width}`)
		.on("click", (event, d) => {
			console.log(d);
			provideModalContent(d);
			openModal();
			event.stopPropagation();
		});

	// const grid = d3.select(".grid");
	// const msnry = new Masonry(grid.node(), {
	// 	itemSelector: ".grid-item",
	// 	columnWidth: 100,
	// 	margin: 0,
	// });
};

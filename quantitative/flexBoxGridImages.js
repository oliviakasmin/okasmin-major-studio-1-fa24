import * as d3 from "d3";
import { realSizeToPixels } from "./utils";

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

export const createGrid = (analyzedData, widthLeftColumn, margin) => {
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

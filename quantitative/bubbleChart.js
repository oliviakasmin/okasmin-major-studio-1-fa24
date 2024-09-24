import * as d3 from "d3";

// TODO - add in future

export const createBubbleChart = (data) => {
	const width = 3000;
	const height = 3000;
	const padding = 50;

	// Create the pack layout
	const pack = d3
		.pack()
		.size([width - padding, height - padding])
		.padding(50);

	// Create the hierarchy from the data
	const hierarchy = d3.hierarchy({ children: data }).sum((d) => {
		if (d.cleanedDimensions) {
			const { width, height } = d.cleanedDimensions;
			return width * height;
		}
	});

	// Compute the pack layout
	const root = pack(hierarchy);

	const svg = d3.select("#chart").attr("width", width).attr("height", height);

	const defs = svg.append("defs");
	defs
		.selectAll("pattern")
		.data(data)
		.join("pattern")
		.attr("id", (d) => d.id)
		.attr("height", "100%")
		.attr("width", "100%")
		.attr("patternContentsUnits", "objectBoundingBox")
		.append("image")
		.attr("height", (d) => `${d.cleanedDimensions.height}px`)
		.attr("width", (d) => `${d.cleanedDimensions.width}px`)
		.attr("xlink:href", (d) => d.thumbnail);

	// Create the bubbles
	const bubbles = svg
		.selectAll(".bubble")
		.data(root.descendants().slice(1))
		.enter()
		.append("g")
		.attr("class", "bubble")
		.attr("transform", (d) => {
			return `translate(${d.x + padding}, ${d.y + padding})`;
		});

	bubbles
		.append("rect")
		.attr("width", (d) => {
			return d.data.cleanedDimensions.width;
		})
		.attr("height", (d) => {
			return d.data.cleanedDimensions.height;
		})
		.attr("stroke", "blue")
		.attr("fill", (d) => `url(#${d.data.id})`)
		.attr("x", function (d) {
			return d.r * -1;
		})
		.attr("y", function (d) {
			return d.r * -1;
		});
};

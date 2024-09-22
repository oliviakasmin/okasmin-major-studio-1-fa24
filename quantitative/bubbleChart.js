import * as d3 from "d3";

function calculateRadius(x, y) {
	// Calculate the diagonal of the rectangle using Pythagoras' theorem
	let diagonal = Math.sqrt(x * x + y * y);

	// Radius is half of the diagonal
	let radius = diagonal / 2;

	return radius;
}

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
			// return calculateRadius(width, height);
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

	// .append("img")
	// .attr("src", (d) => d.thumbnail)
	// .attr("class", "grid-item")

	// Create the bubbles
	const bubbles = svg
		.selectAll(".bubble")
		.data(root.descendants().slice(1))
		.enter()
		.append("g")
		.attr("class", "bubble")
		.attr("transform", (d) => {
			// console.log(d);
			// console.log(d.x);
			// console.log(d.y);
			return `translate(${d.x + padding}, ${d.y + padding})`;
		});

	// Add the circles to the bubbles
	// bubbles
	// 	.append("image")
	// 	.attr("xlink:href", (d) => d.data.thumbnail)
	// 	.attr("height", (d) => `${d.data.cleanedDimensions.height}px`)
	// 	.attr("width", (d) => `${d.data.cleanedDimensions.width}px`)
	// 	.attr("z-index", 2000);

	// bubbles
	// 	.append("circle")
	// 	.attr("r", (d) => {
	// 		// console.log(d.data);

	// 		// const circleRadius = calculateRadius(
	// 		// 	d.data.cleanedDimensions.width,
	// 		// 	d.data.cleanedDimensions.height
	// 		// );
	// 		// console.log(circleRadius);
	// 		// console.log(d.r);
	// 		return d.r;
	// 		// return circleRadius;
	// 	})
	// 	.attr("stroke", "blue")
	// 	.attr("fill", (d) => `url(#${d.data.id})`);

	bubbles
		.append("rect")
		.attr("width", (d) => {
			// console.log(d.data);

			// const circleRadius = calculateRadius(
			// 	d.data.cleanedDimensions.width,
			// 	d.data.cleanedDimensions.height
			// );
			// console.log(circleRadius);
			// console.log(d.r);
			return d.data.cleanedDimensions.width;
			// return circleRadius;
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

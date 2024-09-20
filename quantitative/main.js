import "./style.css";
import * as d3 from "d3";
import { analyzeData } from "./utils";

const getData = async () => {
	const data = await d3.json("../fetch_download_data/data_all_dims.json");
	return data;
};

const data = await getData();

const analyzedDatad = analyzeData(data);
const testData = analyzedDatad.slice(0, 10);

// const margin = { top: 100, right: 50, bottom: 100, left: 80 };
const width = 1400;
const height = 700;

// Add images

const imagesGrid = d3.select("#images-grid");
imagesGrid.attr("width", width).attr("height", height);

imagesGrid
	.append("g")
	.selectAll("image")
	.data(testData)
	.join("image")
	.attr("xlink:href", (d) => d.thumbnail)
	// .attr("x", (d, i) => {
	// 	if (i >= 10) {
	// 		i = i % 10;
	// 	}
	// 	return 100 + 150 * i;
	// })
	// .attr("y", (d, i) => {
	// 	console.log(i);
	// 	if (i < 10) {
	// 		return 10;
	// 	}
	// 	if (i >= 10 && i < 20) {
	// 		return 250;
	// 	}
	// 	if (i >= 20 && i < 30) {
	// 		return 500;
	// 	}
	// 	return 600;
	// })
	.attr("class", "grid-item")
	.attr("height", (d) => d.cleanedDimensions.height)
	.attr("width", (d) => d.cleanedDimensions.width);

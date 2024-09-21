import "./style.css";
import * as d3 from "d3";
import Masonry from "masonry-layout";
import { analyzeData } from "./utils";

const getData = async () => {
	const data = await d3.json("data_all_dims.json");
	return data;
};

const margin = { left: 20 };
const widthLeftColumn = 200;

const data = await getData();

const analyzedDatad = analyzeData(data);
// const testData = analyzedDatad.slice(0, 10);

const leftColumnDiv = d3.select(".left-column");
leftColumnDiv
	.style("width", `${widthLeftColumn + margin.left}px`)
	.style("background-color", "black");

// style person
const personHeight = 167.64; //5.5 ft = 167.64 cm

const personSvg = d3.select(".person");
personSvg.attr("height", personHeight);

const personPos = 982 - personHeight - 50;

const personDiv = d3.select(".person-div");
personDiv
	.style("width", "100px")
	.style("translate", `0 ${personPos}px`)
	.style("margin-left", `${margin.left}px`);

const gridDiv = d3.select(".grid");
gridDiv
	.selectAll("div")
	.data(analyzedDatad)
	.join("div")
	.attr("class", "grid-item")
	.append("img")
	.attr("src", (d) => d.thumbnail)
	.attr("class", "grid-item")
	.attr("height", (d) => `${d.cleanedDimensions.height}px`)
	.attr("width", (d) => `${d.cleanedDimensions.width}`)
	.style("margin-left", `${widthLeftColumn + margin.left}px`);

const grid = d3.select(".grid");
const msnry = new Masonry(grid.node(), {
	itemSelector: ".grid-item",
	columnWidth: screen.width,
	margin: 0,
});

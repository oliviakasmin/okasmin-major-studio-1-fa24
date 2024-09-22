import "./style.css";
import * as d3 from "d3";
import Masonry from "masonry-layout";
import { analyzeData } from "./utils";
import { createGrid } from "./flexBoxGridImages";
import { createBubbleChart } from "./bubbleChart";

const getData = async () => {
	const data = await d3.json("data_all_dims.json");
	return data;
};

const setDataStorage = async () => {
	const data = await getData();
	const { analyzedData, onView, notOnView } = analyzeData(data);

	if (!localStorage.getItem("data")) {
		localStorage.setItem("data", JSON.stringify(analyzedData));
	}
	if (!localStorage.getItem("onView")) {
		localStorage.setItem("onView", JSON.stringify(onView));
	}
	if (!localStorage.getItem("notOnView")) {
		localStorage.setItem("notOnView", JSON.stringify(notOnView));
	}
};

setDataStorage();

const analyzedData = JSON.parse(localStorage.getItem("data"));
// const onView = JSON.parse(localStorage.getItem("onView"));
// const notOnView = JSON.parse(localStorage.getItem("notOnView"));

const margin = { left: 20 };
const widthLeftColumn = 100;

const testData = analyzedData.slice(0, 50);

const leftColumnDiv = d3.select(".left-column");
leftColumnDiv
	.style("width", `${widthLeftColumn + margin.left}px`)
	.style("background-color", "black");

// style person
const personHeight = 167.64; //5.5 ft = 167.64 cm

const personSvg = d3.select(".person");
personSvg.attr("height", personHeight);

const personPos = window.innerHeight - personHeight;

const personDiv = d3.select(".person-div");
personDiv.style("width", "100px").style("margin-left", `${margin.left}px`);

const checkBoxesDiv = d3.select(".checkboxes-div");
checkBoxesDiv.style("margin-left", `${margin.left}px`);

createGrid(analyzedData, widthLeftColumn, margin);

// createBubbleChart(analyzedData);

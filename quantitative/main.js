import "./style.css";
import * as d3 from "d3";
import { analyzeData } from "./utils";
import { createGrid } from "./flexBoxGridImages";

const getData = async () => {
	const data = await d3.json("data_all_dims.json");
	return data;
};

const setDataStorage = async () => {
	const data = await getData();
	const { analyzedData } = analyzeData(data);

	if (!localStorage.getItem("data")) {
		localStorage.setItem("data", JSON.stringify(analyzedData));
	}
};

setDataStorage();

const analyzedData = JSON.parse(localStorage.getItem("data"));

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

const checkBoxesDiv = d3.select(".checkboxes-div");
checkBoxesDiv.style("margin-left", `${margin.left}px`);

createGrid(analyzedData, widthLeftColumn, margin);

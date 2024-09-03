/*
  Exercise 3
  DOM manipulation with vanilla JS
*/

const viz = document.body.querySelector(".viz");
const button = document.body.querySelector("#button");

const addIrisChildToViz = (irisHeight) => {
	const newChild = document.createElement("div");
	newChild.className = "rectangle";
	newChild.style.height = irisHeight * 50 + "px";
	viz.appendChild(newChild);
};

const drawIrisData = async () => {
	const response = await window.fetch("./iris_json.json");
	const data = await response.json();
	data.forEach((e) => {
		addIrisChildToViz(e.petallength);
	});
};

drawIrisData();

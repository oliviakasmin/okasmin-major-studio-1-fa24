const getData = async () => {
	const data = await d3.json("../fetch_download_data/data.json");
	return data;
};

const data = await getData();

// render images of first 5 images for prototype test
const testData = data.slice(0, 5);

const margin = { top: 100, right: 50, bottom: 100, left: 80 };
const width = 1400;
const height = 700;

const svg = d3
	.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

svg
	.append("g")
	.selectAll("image")
	.data(testData)
	.join("image")
	.attr("xlink:href", (d) => d.thumbnail)
	.attr("x", (d, i) => 10 + 100 * i)
	.attr("y", 10)
	.attr("width", 100)
	.attr("height", 100);

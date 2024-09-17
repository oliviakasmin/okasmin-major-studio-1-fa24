// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
import { API_KEY } from "../../secrets.js";

// put your API key here;
const apiKey = API_KEY;

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// Constructing the search query
const search = `unit_code:"NPG" AND "portrait" AND "painting" AND online_media_type:"Images"`;

// object_type
// - "Painting; Painting"
// - "Painting, Portrait"

// topic - "Portrait"; "Painting"

// https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// search: fetches an array of terms based on term category
const fetchSearchData = async (searchTerm) => {
	let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
	console.log(url);
	try {
		const res = await window.fetch(url);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

fetchSearchData(search);

// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search

// put your API key here;
const apiKey = "";

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
const search = `unit_code:"NPG" AND "portrait" AND "painting" AND "canvas" AND online_visual_material:true`;

// array that we will write into
let myArray = [];

// string that will hold the stringified JSON data
let jsonString = "";

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
	let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
	window
		.fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log({ data });

			// constructing search queries to get all the rows of data
			// you can change the page size
			let pageSize = 1000;
			let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
			console.log(numberOfQueries);
			let searchAllURL;
			for (let i = 0; i < numberOfQueries; i++) {
				// making sure that our last query calls for the exact number of rows
				if (i == numberOfQueries - 1) {
					searchAllURL =
						url +
						`&start=${i * pageSize}&rows=${
							data.response.rowCount - i * pageSize
						}`;
				} else {
					searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
				}
				// console.log(searchAllURL);
				fetchAllData(searchAllURL);
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
	window
		.fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			data.response.rows.forEach(function (n) {
				addObject(n);
			});
			jsonString += JSON.stringify(myArray);
			console.log(myArray);
		})
		.catch((error) => {
			console.log(error);
		});
}

// create your own array with just the data you need
function addObject(objectData) {
	const { content } = objectData;
	const { descriptiveNonRepeating, freetext } = content;

	// need to check if have all fields below, if not, don't add to array

	const { id, title } = objectData;
	const { record_link, online_media } = descriptiveNonRepeating;
	const { physicalDescription, name, setName } = freetext;

	const thumbnail = online_media.media[0].thumbnail;
	const imageResources = online_media.media[0].resources;

	//get medium and dimensions
	let dimensions = [];
	let medium;
	physicalDescription.forEach((obj) => {
		if (obj.label === "Medium") {
			medium = obj.content;
		}
		if (obj.label === "Dimensions") {
			dimensions.push(obj.content);
		}
	});

	// check if currently on view
	let onView = false;
	setName.forEach((obj) => {
		if (obj.label === "On View") {
			onView = true;
		}
	});

	if (
		id &&
		title &&
		record_link &&
		physicalDescription &&
		thumbnail &&
		name &&
		dimensions &&
		medium &&
		setName &&
		imageResources
	) {
		myArray.push({
			id,
			title,
			link: record_link,
			physicalDescription,
			thumbnail,
			name,
			dimensions,
			medium,
			onView,
			setName,
			imageResources,
		});
	}
}

fetchSearchData(search);

//---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries

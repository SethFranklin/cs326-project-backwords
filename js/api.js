
/*
/page/ POST - needs body and next page id
- returns new page id
/page/ GET - needs page id
- returns object type {page id, body, next page id, timestamp, num pages before, num pages left}
/page/ PATCH? - needs page id and new body
- returns page id
/page/ DELETE - needs page id
- returns next page id
/leaves/ GET (dump leaves sorted by latest timestamp) - needs no arguments
- returns array of objects type {page id, preview, num pages left}
*/

// @TODO: make actual api calls using fetch to the server isntead of making dummy calls
// @TODO: write function signatures/explanations. are comments required for this project?

function createPage(body, next_pid) {
	return 2;
}

function readPage(pid) {
	if (pid === 0) {
		return {pid: 0, body: "This is the very first page!\nwow", next_pid: undefined, timestamp: 1661839772441, num_prior: 2, num_left: 0};
	} else if (pid === 1) {
		return {pid: 1, body: "Left branch is going vert interesting", next_pid: 0, timestamp: 1661839794850, num_prior: 0, num_left: 1};
	} else {
		return {pid: 2, body: "Right branch so far wowww", next_pid: 0, timestamp: 1661839804672, num_prior: 0, num_left: 1};
	}
}

function updatePage(pid, body) {
	return 1;
}

function deletePage(pid) {
	return 0;
}

function getLeaves() {
	return [{"pid": 1, "preview": "Left branch...", "num_left": 1}, {"pid": 2, "preview": "Right branch...", "num_left": 1}];
}

export { createPage, readPage, updatePage, deletePage, getLeaves };
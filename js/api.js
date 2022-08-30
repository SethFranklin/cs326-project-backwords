
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

// @TODO: make actual api calls to the server isntead of making dummy calls

function createPage(body, next_pid) {

}

function readPage(pid) {

}

function updatePage(pid, new_body) {

}

function deletePage(pid) {

}

function getLeaves() {
	return [{"pid": 2, "preview": "Left branch...", "num_left": 1}, {"pid": 3, "preview": "Right branch...", "num_left": 1}];
}

export { getLeaves };
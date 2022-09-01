
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

async function createPage(body, next_pid) {
	const response = await fetch("/page?" + new URLSearchParams({
		body: body,
		next_pid: next_pid
	}), {method: "POST"});
	return await response.json();
}

async function readPage(pid) {
	const response = await fetch("/page?" + new URLSearchParams({
		pid: pid
	}), {method: "GET"});
	return await response.json();
}

async function updatePage(pid, body) {
	const response = await fetch("/page?" + new URLSearchParams({
		pid: pid,
		body: body
	}), {method: "PATCH"});
	return await response.json();
}

async function deletePage(pid) {
	const response = await fetch("/page?" + new URLSearchParams({
		pid: pid
	}), {method: "DELETE"});
	return await response.json();
}

async function getLeaves() {
	const response = await fetch("/leaves", {method: "GET"});
	return await response.json();
}

export { createPage, readPage, updatePage, deletePage, getLeaves };
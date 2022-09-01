
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

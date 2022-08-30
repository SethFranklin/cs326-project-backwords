
import { readPage, deletePage } from "../api.js";
import { MainView } from "./main.js";

class ViewView {
	constructor(view_container, view_data) {
		// Store/clear any cur_view
		window.localStorage.setItem("cur_view", "view");
		window.localStorage.setItem("view_data", JSON.stringify(view_data));
		// view_data.pid holds page id
		// Clear view
		view_container.replaceChildren([]);
		// Display header
		const header = document.createElement("h1");
		const header_text_node = document.createTextNode("Backwords");
		header.classList.add("header");
		header.appendChild(header_text_node);
		header.addEventListener("click", function() {
			new MainView(view_container, undefined);
		});
		view_container.appendChild(header);
		// Gets page data
		const page = readPage(view_data.pid);
		// Display date created
		const date = document.createElement("p");
		const date_text_node = document.createTextNode("Date created: " + new Date(page.timestamp));
		date.classList.add("info");
		date.appendChild(date_text_node);
		view_container.appendChild(date);
		// Display pages left
		const pages_left = document.createElement("p");
		const pages_left_text_node = document.createTextNode(page.num_left + " page(s) until the end");
		pages_left.classList.add("info");
		pages_left.appendChild(pages_left_text_node);
		view_container.appendChild(pages_left);
		// Display number of prior pages
		const pages_prior = document.createElement("p");
		const pages_prior_text_node = document.createTextNode(page.num_prior + " page(s) immediately precede this page");
		pages_prior.classList.add("info");
		pages_prior.appendChild(pages_prior_text_node);
		view_container.appendChild(pages_prior);
		// Display page body in container
		const page_container = document.createElement("div");
		const page_container_text_node = document.createTextNode(page.body);
		page_container.classList.add("page");
		page_container.appendChild(page_container_text_node);
		view_container.appendChild(page_container);
		// Display delete button if a leaf and not last page
		if (page.num_prior === 0 && page.num_left !== 0) {
			const delete_button = document.createElement("button");
			const delete_text_node = document.createTextNode("Delete this leaf");
			delete_button.classList.add("button");
			delete_button.appendChild(delete_text_node);
			delete_button.addEventListener("click", function() {
				deletePage(page.pid);
				//new DeleteView(view_container, {next_pid: page.next_pid});
			});
			view_container.appendChild(delete_button);
		}
		// Display update button
		const update_button = document.createElement("button");
		const update_text_node = document.createTextNode("Edit this page");
		update_button.classList.add("button");
		update_button.appendChild(update_text_node);
		update_button.addEventListener("click", function() {
			//new UpdateView(view_container, {pid: page.pid, body: page.body});
		});
		view_container.appendChild(update_button);
		// Display create new page before button
		const create_button = document.createElement("button");
		const create_text_node = document.createTextNode("Create a new page before this page");
		create_button.classList.add("button");
		create_button.appendChild(create_text_node);
		create_button.addEventListener("click", function() {
			//new CreateView(view_container, {next_pid: page.next_pid, body: page.body});
		});
		view_container.appendChild(create_button);
		// Display next page button if not last page
		if (page.num_left !== 0) {
			const next_button = document.createElement("button");
			const next_text_node = document.createTextNode("Read the next page");
			next_button.classList.add("button");
			next_button.appendChild(next_text_node);
			next_button.addEventListener("click", function() {
				new ViewView(view_container, {pid: page.next_pid});
			});
			view_container.appendChild(next_button);
		}
	}
}

export { ViewView };

import { MainView } from "./main.js";
import { ViewView } from "./view.js";

class DeleteView {
	constructor(view_container, view_data) {
		// Store/clear any cur_view
		window.localStorage.setItem("cur_view", "delete");
		window.localStorage.setItem("view_data", JSON.stringify(view_data));
		// view_data.next_pid holds next page id
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
		// Display info text node
		const info = document.createElement("p");
		const info_text_node = document.createTextNode("The page was deleted.");
		info.classList.add("info");
		info.appendChild(info_text_node);
		view_container.appendChild(info);
		// Display next page button
		const next_button = document.createElement("button");
		const next_text_node = document.createTextNode("Read the next page");
		next_button.classList.add("button");
		next_button.appendChild(next_text_node);
		next_button.addEventListener("click", function() {
			new ViewView(view_container, {pid: view_data.next_pid});
		});
		view_container.appendChild(next_button);
	}
}

export { DeleteView };
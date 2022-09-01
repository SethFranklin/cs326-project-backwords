
import { updatePage } from "../api.js";
import { MainView } from "./main.js";
import { ViewView } from "./view.js";

class UpdateView {
	constructor(view_container, view_data) {
		// Store/clear any cur_view
		window.localStorage.setItem("cur_view", "update");
		window.localStorage.setItem("view_data", JSON.stringify(view_data));
		// view_data.pid holds pid
		// view_data.body holds body
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
		const info_text_node = document.createTextNode("You are editing this page.");
		info.classList.add("info");
		info.appendChild(info_text_node);
		view_container.appendChild(info);
		// Display text area
		const text_area = document.createElement("textarea");
		text_area.value = view_data.body;
		text_area.rows = 30;
		text_area.cols = 50;
		text_area.classList.add("page");
		text_area.addEventListener("keyup", function() {
			view_data.body = text_area.value;
			window.localStorage.setItem("view_data", JSON.stringify(view_data));
		})
		view_container.appendChild(text_area);
		// Display line break
		view_container.appendChild(document.createElement("br"));
		// Display cancel button
		const cancel_button = document.createElement("button");
		const cancel_text_node = document.createTextNode("Cancel");
		cancel_button.classList.add("button");
		cancel_button.appendChild(cancel_text_node);
		cancel_button.addEventListener("click", function() {
			new ViewView(view_container, {pid: view_data.pid});
		});
		view_container.appendChild(cancel_button);
		// Display save edits button
		const save_button = document.createElement("button");
		const save_text_node = document.createTextNode("Save your edits");
		save_button.classList.add("button");
		save_button.appendChild(save_text_node);
		save_button.addEventListener("click", function() {
			updatePage(view_data.pid, view_data.body);
			new ViewView(view_container, {pid: view_data.pid});
		});
		view_container.appendChild(save_button);
	}
}

export { UpdateView };
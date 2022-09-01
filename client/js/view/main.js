
import { getLeaves } from "../api.js";
import { ViewView } from "./view.js";

class MainView {
	constructor() {
	}

	async initialize(view_container, view_data) {
		// Store/clear any cur_view or view_data
		window.localStorage.setItem("cur_view", "main");
		// Clear view
		view_container.replaceChildren([]);
		// Display header
		const header = document.createElement("h1");
		const header_text_node = document.createTextNode("Backwords");
		header.classList.add("header");
		header.appendChild(header_text_node);
		header.addEventListener("click", async function() {
			const view = new MainView();
			await view.initialize(view_container, undefined);
		});
		view_container.appendChild(header);
		// Display "Turn a new leaf idiom"
		const new_leaf = document.createElement("p");
		const new_leaf_text_node = document.createTextNode("Turn a new leaf!");
		new_leaf.classList.add("info");
		new_leaf.appendChild(new_leaf_text_node);
		view_container.appendChild(new_leaf);
		// Display leaves
		const leaves = await getLeaves();
		leaves.forEach(async function(leaf) {
			const container = document.createElement("div");
			const container_p = document.createElement("p");
			const p_text_node = document.createTextNode("\"" + leaf.preview + "\" " + leaf.num_left + " page(s) until the end");
			const read_button = document.createElement("button");
			const button_text_node = document.createTextNode("Read this leaf");
			container.classList.add("container");
			container_p.classList.add("info");
			read_button.classList.add("button");
			container_p.appendChild(p_text_node);
			read_button.appendChild(button_text_node);
			container.appendChild(container_p);
			container.appendChild(read_button);
			read_button.addEventListener("click", async function() {
				const view = new ViewView();
				await view.initialize(view_container, {pid: leaf.pid});
			});
			view_container.appendChild(container);
		});
	}
}

export { MainView };
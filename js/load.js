
import { MainView } from "./view/main.js";
import { ViewView } from "./view/view.js";
import { DeleteView } from "./view/delete.js";
import { UpdateView } from "./view/update.js";

window.addEventListener("load", async function() {
	// get view_container div
	const view_container = document.getElementById("view_container")
	// check view and view data from local storage
	const cur_view = window.localStorage.getItem("cur_view");
	const view_data_string = window.localStorage.getItem("view_data");
	const view_data = (cur_view === null || view_data_string === null) ? undefined : JSON.parse(view_data_string);
	// create appropriate view object
	if (cur_view === null || cur_view === "main") {
		new MainView(view_container, view_data);
	} else if (cur_view === "view") {
		new ViewView(view_container, view_data);
	} else if (cur_view === "delete") {
		new DeleteView(view_container, view_data);
	} else if (cur_view === "update") {
		new UpdateView(view_container, view_data);
	}
});
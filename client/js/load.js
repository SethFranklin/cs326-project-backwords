
import { MainView } from "./view/main.js";
import { ViewView } from "./view/view.js";
import { DeleteView } from "./view/delete.js";
import { UpdateView } from "./view/update.js";
import { CreateView } from "./view/create.js";

window.addEventListener("load", async function() {
	// get view_container div
	const view_container = document.getElementById("view_container")
	// check view and view data from local storage
	const cur_view = window.localStorage.getItem("cur_view");
	const view_data_string = window.localStorage.getItem("view_data");
	const view_data = (cur_view === null || view_data_string === null) ? undefined : JSON.parse(view_data_string);
	// create appropriate view object
	if (cur_view === null || cur_view === "main") {
		const view = new MainView();
		await view.initialize(view_container, view_data);
	} else if (cur_view === "view") {
		const view = new ViewView();
		await view.initialize(view_container, view_data);
	} else if (cur_view === "delete") {
		const view = new DeleteView();
		await view.initialize(view_container, view_data);
	} else if (cur_view === "update") {
		const view = new UpdateView();
		await view.initialize(view_container, view_data);
	} else if (cur_view === "create") {
		const view = new CreateView();
		await view.initialize(view_container, view_data);
	}
});
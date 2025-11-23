import { useState } from "react";
import Menu from "./Menu";
import Task from "./Task";

function App() {
	const [current_task_selected, select_task] = useState<string>("");
	const [new_list_call, call_new_list] = useState<boolean>(false);

	return (
		<main className="flex gap-2">
			<Menu
				show_list_data={select_task}
				new_list_call={new_list_call}
				call_new_list={call_new_list}></Menu>

			<Task selected_task={current_task_selected} call_newlist={call_new_list}></Task>
		</main>
	);
}

export default App;

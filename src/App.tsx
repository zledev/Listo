import { useState } from "react";
import Menu from "./Menu";
import Task from "./Task";

function App() {
	const [task_status, modify_visibility] = useState<string>("");
	const [new_list_call, call_new_list] = useState<boolean>(false);

	return (
		<main className="flex gap-2">
			<Menu
				show_list_data={modify_visibility}
				new_list_call={new_list_call}
				call_new_list={call_new_list}></Menu>

			<Task status={task_status} call_newlist={call_new_list}></Task>
		</main>
	);
}

export default App;

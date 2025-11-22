import { useEffect, type ReactNode } from "react";

import { useState } from "react";

function TaskManager(
	{ status, call_newlist }: { status: string; call_newlist: React.Dispatch<React.SetStateAction<boolean>>; }
): ReactNode {
	const [selected, update_selected] = useState<string>("");

	useEffect(() => {
		if (status.length == 0) return;

		update_selected(status);
	}, [status]);

	return (
		<>
			<div
				className={`${
					status ? "hidden" : ""
				} grid justify-center w-full mt-6 z-1 select-none`}>
				<div
					className="p-15 bg-gray-200 h-fit w-[65vw] max-w-120 
				m-auto top-[50%] rounded-2xl">
					<h1 className="font-bold text-[1rem] sm:text-[2rem] text-center mb-2">
						Welcome to Listo!
					</h1>

					<div className="w-full justify-center flex h-10">
						<div className="border w-[40vw] h-0 border-gray-300 mt-5 mb-1 justify-center"></div>
					</div>

					<div className="grid justify-center gap-4">
						<h2
							className="text-[1rem] sm:text-[1rem] text-center
						 hover:text-gray-800 text-gray-500"
						 onClick={() => {
							call_newlist(true);
						 }}>
							Create New List
						</h2>
						<a href="https://github.com/zledev/" className="text-center" target="_blank">
							<h2 className="text-blue-600 hover:text-blue-400">
								Visit Github
							</h2>
						</a>
					</div>
				</div>
			</div>
			<div className={status ? "" : "hidden"}>
				<h1></h1>
			</div>
		</>
	);
}

export default TaskManager;

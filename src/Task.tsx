import { useEffect, useRef, type ReactNode } from "react";
import { useState } from "react";
import edit from "./assets/edit.svg";

function TaskManager({
	selected_task: status,
	call_newlist,
}: {
	selected_task: string;
	call_newlist: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
	// const [selected, update_selected] = useState<string>("");
	const [update_status, call_update] = useState<boolean>(false);
	const render_update = () => {
		call_update(update_status ? false : true);
	};

	const add_new_task_mirrorRef = useRef<HTMLDivElement>(null);
	const updateAddNewListHeight = (e: HTMLTextAreaElement) => {
		add_new_task_mirrorRef.current!.style.width = `${e.clientWidth}px`;
		add_new_task_mirrorRef.current!.textContent = e.value + "\u200b";
		e.style.height = `${
			add_new_task_mirrorRef.current!.getBoundingClientRect().height
		}px`;
	};

	useEffect(() => {
		if (status.length == 0) return;
		//update_selected(status);
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
						<a
							href="https://github.com/zledev/"
							className="text-center"
							target="_blank">
							<h2 className="text-blue-600 hover:text-blue-400">
								Visit Github
							</h2>
						</a>
						<h2
							className="text-[1rem] sm:text-[1rem] text-center
						 hover:text-gray-800 text-gray-500"
							onClick={() => {
								call_newlist(true);
							}}>
							Create New List
						</h2>
					</div>
				</div>
			</div>
			<div
				className={`${
					status ? "" : "hidden"
				} w-[65vw] mt-6 z-1 select-none box-border`}>
				<h1 className="text-4xl flex gap-5 font-semibold p-6 h-fit w-fit">
					{localStorage.getItem(status)!}
					<img src={edit} className="w-8 mt-1.5"></img>
				</h1>

				<div className="ml-5 sm:ml-15 w-full">
					<h2
						className="m-1 text-[1.5rem] font-medium
				 border-b-2 border-gray-200 pl-2">
						TASKS
					</h2>
					<div className="w-full">
						<div className="pl-5 pr-5 w-full">
							<textarea
								placeholder="+ Add new task"
								className="bg-gray-200 rounded-lg 
						 mt-4 sm:text-[1.5rem] sm:h-13 p-2 pl-3 overflow-hidden
						 hover:bg-gray-300 w-full h-10 resize-none"
								onFocus={(e) => {
									e.currentTarget.placeholder = "";
								}}
								onBlur={(e) => {
									let el: HTMLTextAreaElement = e.currentTarget;
									el.placeholder = "+ Add new task";
									el.value = "";
									updateAddNewListHeight(el);
									render_update();
								}}
								onChange={(e) => {
									updateAddNewListHeight(e.currentTarget);
									render_update();
								}}></textarea>

							<div
								ref={add_new_task_mirrorRef}
								className="whitespace-pre-wrap wrap-break-word
							pl-4 p-2 sm:text-[1.5rem] absolute invisible left-[-9999px] top-0"></div>
						</div>
					</div>
					<div className="w-full">
						<ul className="grid gap-5 mt-5">
							<li>
								<div
									className="flex bg-gray-100 rounded-[0.7rem] 
									p-2.5 hover:bg-gray-200 text-1xl 
									h-10 overflow-hidden w-full">
									<div className="border w-6 h-5 mb-1 mr-2 rounded-[0.2rem] hover:bg-gray-100"></div>
									<textarea
										value=""
										className="resize-none w-full"
										disabled></textarea>
									<img src={edit} className="w-5"></img>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default TaskManager;

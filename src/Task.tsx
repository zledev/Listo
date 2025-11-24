import { useEffect, useRef, type ReactNode } from "react";
import { useState } from "react";
import edit from "./assets/edit.svg";

function TaskManager({
	selected_task,
	call_newlist,
}: {
	selected_task: string;
	call_newlist: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
	const [selected, update_selected] = useState<string>("");
	const [update_status, call_update] = useState<boolean>(false);
	const render_update = () => {
		call_update(update_status ? false : true);
	};

	const textArea_mirrorRef = useRef<HTMLDivElement>(null);
	const updateTextAreaHeight = (
		e: HTMLTextAreaElement,
		mirrorClass: string[]
	) => {
		textArea_mirrorRef.current!.classList.add(...mirrorClass);
		textArea_mirrorRef.current!.style.width = `${e.clientWidth}px`;
		textArea_mirrorRef.current!.textContent = e.value + "\u200b";
		e.style.height = `${
			textArea_mirrorRef.current!.getBoundingClientRect().height
		}px`;
		textArea_mirrorRef.current!.style.width = "";
		textArea_mirrorRef.current!.classList.remove(...mirrorClass);
	};

	const [tasks, modifyTasks] = useState<string[]>([]);

	const updateTasks = (selTask: string) => {
		let task_tracker: string | null = localStorage.getItem(
			selTask + "-task_tracker"
		);

		if (task_tracker == null)
			localStorage.setItem(selTask + "-task_tracker", "0");

		let taskNum: number = Number(task_tracker);
		let newTasks: string[] = [];

		for (
			let i = 0;
			i <
			(selTask == selected
				? taskNum - tasks.length > 0
					? taskNum
					: 0
				: taskNum);
			i++
		) {
			let curTask: string | null = localStorage.getItem(
				selTask +
					"_task-" +
					(selTask == selected ? i + 1 + tasks.length : i + 1).toString()
			);

			if (curTask) newTasks.push(curTask);
		}

		modifyTasks(
			selTask === selected && selected ? tasks.concat(newTasks) : newTasks
		);
	};

	useEffect(() => {
		if (selected_task.length == 0) return;
		updateTasks(selected_task);
		update_selected(selected_task);
	}, [selected_task]);

	return (
		<>
			<div
				className={`${
					selected_task ? "hidden" : ""
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
					selected_task ? "" : "hidden"
				} w-[65vw] mt-6 z-1 select-none box-border`}>
				<h1 className="text-4xl flex gap-5 font-semibold p-6 h-fit w-fit">
					{localStorage.getItem(selected_task)!}
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

									if (el.value.replace(/\s+/g, "").length == 0) return;

									let tracker: number = Number(
										localStorage.getItem(selected + "-task_tracker")!
									);

									localStorage.setItem(
										selected + "-task_tracker",
										(++tracker).toString()
									);

									localStorage.setItem(selected + "_task-" + tracker, el.value);
									el.value = "";
									updateTextAreaHeight(el, ["pl-4", "p-2", "sm:text-[1.5rem]"]);
									updateTasks(selected);
									render_update();
								}}
								onChange={(e) => {
									updateTextAreaHeight(e.currentTarget, [
										"pl-4",
										"p-2",
										"sm:text-[1.5rem]",
									]);
									render_update();
								}}></textarea>
						</div>
					</div>
					<div className="w-full">
						<ul className="grid gap-5 mt-5">
							{tasks.map((task: string, index: number) => {
								return (
									<li className="pointer-events-none" key={index}>
										<div
											className="flex overflow-hidden w-full gap-2 pointer-events-auto h-auto"
											onClick={(e) => {
												if (e.target == e.currentTarget) {
													let target = e.currentTarget;
													target.querySelector("input")!.checked = true;

													let textAreaChild: HTMLTextAreaElement =
														target.querySelector("textarea")!;

													textAreaChild.style.color = "#9CA3AF";
													textAreaChild.style.textDecorationLine =
														"line-through";

													let svg: SVGSVGElement = target.querySelector("svg")!;
													svg.remove();

													if (svg.classList.contains("hidden"))
														svg.classList.remove("hidden");
												}
											}}>
											<input
												type="checkbox"
												className="ml-2 mt-1 w-6"
												disabled></input>

											<textarea
												value={task}
												className="bg-gray-200 rounded-lg 
										hover:bg-gray-300 text-2xl font-medium
										p-1 pl-3 h-10 resize-none mt-[0.45rem] w-full
										pointer-events-none select-none mb-1 overflow-hidden"
												onFocus={(e) => {
													let el: HTMLTextAreaElement = e.currentTarget;
													el.readOnly = false;
												}}
												onChange={(e) => {
													updateTextAreaHeight(e.currentTarget, [
														"text-2xl",
														"p-1",
														"pl-3",
													]);
												}}
												onBlur={(e) => {
													let el: HTMLTextAreaElement = e.currentTarget;
													if (el.value.length == 0) return;
												}}></textarea>
											<svg
												className="mt-3.5 hover:fill-gray-100"
												width="40px"
												height="25px"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												onClick={(e) => {
													let textArea =
														e.currentTarget.parentElement!.querySelector(
															"textarea"
														);
													textArea?.classList.remove("pointer-events-none");
													textArea!.disabled = false;
													textArea?.focus();
												}}>
												<path
													opacity="0.4"
													d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
													stroke="#292D32"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
													stroke="#292D32"
													strokeWidth="1.5"
													strokeMiterlimit="10"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													opacity="0.4"
													d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
													stroke="#292D32"
													strokeWidth="1.5"
													strokeMiterlimit="10"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<svg
												className="fill-[#71717A] hover:fill-red-600 
										focus:fill-red-600 mt-3.5 hidden"
												width="40px"
												height="25px"
												viewBox="0 0 24 24"
												onClick={() => {}}
												xmlns="http://www.w3.org/2000/svg">
												<path d="M1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25V3.75ZM22.5 5.25C22.9142 5.25 23.25 4.91421 23.25 4.5C23.25 4.08579 22.9142 3.75 22.5 3.75V5.25ZM1.5 5.25H22.5V3.75H1.5V5.25Z" />
												<path d="M9.75 1.5V0.75V1.5ZM8.25 3H7.5H8.25ZM7.5 4.5C7.5 4.91421 7.83579 5.25 8.25 5.25C8.66421 5.25 9 4.91421 9 4.5H7.5ZM15 4.5C15 4.91421 15.3358 5.25 15.75 5.25C16.1642 5.25 16.5 4.91421 16.5 4.5H15ZM15.75 3H16.5H15.75ZM14.25 0.75H9.75V2.25H14.25V0.75ZM9.75 0.75C9.15326 0.75 8.58097 0.987053 8.15901 1.40901L9.21967 2.46967C9.36032 2.32902 9.55109 2.25 9.75 2.25V0.75ZM8.15901 1.40901C7.73705 1.83097 7.5 2.40326 7.5 3H9C9 2.80109 9.07902 2.61032 9.21967 2.46967L8.15901 1.40901ZM7.5 3V4.5H9V3H7.5ZM16.5 4.5V3H15V4.5H16.5ZM16.5 3C16.5 2.40326 16.2629 1.83097 15.841 1.40901L14.7803 2.46967C14.921 2.61032 15 2.80109 15 3H16.5ZM15.841 1.40901C15.419 0.987053 14.8467 0.75 14.25 0.75V2.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L15.841 1.40901Z" />
												<path d="M9 17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25H9ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75H10.5ZM10.5 17.25V9.75H9V17.25H10.5Z" />
												<path d="M13.5 17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25H13.5ZM15 9.75C15 9.33579 14.6642 9 14.25 9C13.8358 9 13.5 9.33579 13.5 9.75H15ZM15 17.25V9.75H13.5V17.25H15Z" />
												<path d="M18.865 21.124L18.1176 21.0617L18.1176 21.062L18.865 21.124ZM17.37 22.5L17.3701 21.75H17.37V22.5ZM6.631 22.5V21.75H6.63093L6.631 22.5ZM5.136 21.124L5.88343 21.062L5.88341 21.0617L5.136 21.124ZM4.49741 4.43769C4.46299 4.0249 4.10047 3.71818 3.68769 3.75259C3.2749 3.78701 2.96818 4.14953 3.00259 4.56231L4.49741 4.43769ZM20.9974 4.56227C21.0318 4.14949 20.7251 3.78698 20.3123 3.75259C19.8995 3.7182 19.537 4.02495 19.5026 4.43773L20.9974 4.56227ZM18.1176 21.062C18.102 21.2495 18.0165 21.4244 17.878 21.5518L18.8939 22.6555C19.3093 22.2732 19.5658 21.7486 19.6124 21.186L18.1176 21.062ZM17.878 21.5518C17.7396 21.6793 17.5583 21.75 17.3701 21.75L17.3699 23.25C17.9345 23.25 18.4785 23.0379 18.8939 22.6555L17.878 21.5518ZM17.37 21.75H6.631V23.25H17.37V21.75ZM6.63093 21.75C6.44274 21.75 6.26142 21.6793 6.12295 21.5518L5.10713 22.6555C5.52253 23.0379 6.06649 23.25 6.63107 23.25L6.63093 21.75ZM6.12295 21.5518C5.98449 21.4244 5.89899 21.2495 5.88343 21.062L4.38857 21.186C4.43524 21.7486 4.69172 22.2732 5.10713 22.6555L6.12295 21.5518ZM5.88341 21.0617L4.49741 4.43769L3.00259 4.56231L4.38859 21.1863L5.88341 21.0617ZM19.5026 4.43773L18.1176 21.0617L19.6124 21.1863L20.9974 4.56227L19.5026 4.43773Z" />
											</svg>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>

			<div
				ref={textArea_mirrorRef}
				className="whitespace-pre-wrap wrap-break-word 
				absolute top-0 left-[-9999px]">
				w
			</div>
		</>
	);
}

export default TaskManager;
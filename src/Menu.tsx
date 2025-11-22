import React, { useEffect, useRef, useState, type ReactNode } from "react";

function Menu({
	show_list_data,
	new_list_call,
	call_new_list,
}: {
	show_list_data: React.Dispatch<React.SetStateAction<string>>;
	call_new_list: React.Dispatch<React.SetStateAction<boolean>>;
	new_list_call: boolean;
}): ReactNode {
	const [add_new, showAddNew] = useState<string>("hidden");
	const inputRef = useRef<HTMLInputElement>(null);
	const [list, add_list] = useState<string[]>([]);
	const [menu_status, setStatus] = useState<boolean>(false);
	const [list_focus_index, modify_focus_index] = useState<number | null>(null);

	useEffect(() => {
		call_new_list(false); // Acknowledged
		if (new_list_call) {
			setStatus(true);
			showAddNew("");
		}
	}, [new_list_call]);

	useEffect(() => {
		if (add_new == "") inputRef.current?.focus();
	}, [add_new]);

	useEffect(() => {
		let x: string | null = localStorage.getItem("list-tracker");
		if (x == null) {
			localStorage.setItem("list-tracker", "1");
			return;
		}

		updateList(Number(x));
	}, []);

	const updateList = (val: number) => {
		let list_data: string[] = [];
		for (let i = 0; i < val; i++) {
			list_data.push(localStorage.getItem("list-" + `${i}`)!);
		}

		add_list([...list_data]);
	};

	return (
		<>
			<div
				className={`${
					menu_status ? "hidden" : ""
				}  bg-gray-200 h-[95vh] mt-6 ml-6 
				  rounded-2xl w-17 z-2 select-none`}>
				<div>
					<svg
						viewBox="0 0 448 512"
						width={44}
						height={44}
						fill="gray"
						className="hover:fill-gray-300 hover:bg-gray-400 rounded-[0.3rem] p-1 mr-10 ml-3 mt-10.5"
						onClick={() => {
							setStatus(true);
						}}>
						<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
					</svg>
				</div>

				<div className="border border-gray-400 mt-5.5 w-[] max-w-[70%] ml-2.5"></div>

				<div className="grid">
					<div className="flex justify-center mt-2">
						<ul>
							{list.map(
								(x: string, index: number) =>
									x !== null && (
										<li
											className={`w-10.5 p-2 mt-4 text-center bg-gray-300 
							rounded-2xl font-bold text-[1rem] hover:bg-gray-400 ${
								list_focus_index == index ? "bg-gray-400" : ""
							}`}
											key={index}
											id={`${index}`}
											onClick={() => {
												show_list_data(`list-${index}`);
												modify_focus_index(index);
											}}>
											{x.charAt(0)}
										</li>
									)
							)}
						</ul>
					</div>

					<div
						className="ml-3 mt-3 hover:bg-gray-300 rounded-2xl w-fit p-1"
						onClick={() => {
							setStatus(true);
							showAddNew("");
						}}>
						<svg viewBox="0 0 448 512" width={34} height={34}>
							<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
						</svg>
					</div>
				</div>
			</div>

			<div
				className={`pl-5 pt-10 bg-gray-200 mt-6 ml-6 rounded-2xl 
					h-[95vh] w-[87vw] max-w-100 select-none ${menu_status ? " " : "hidden"}`}>
				<div className="flex">
					<h2 className="text-4xl font-bold text-gray-500 pt-1s">Menu</h2>
					<div className="w-100 flex justify-end">
						<svg
							viewBox="0 0 448 512"
							width={44}
							height={44}
							fill="gray-600"
							className="fill-gray-300 bg-gray-400 hover:fill-gray-400 hover:bg-gray-200 rounded-[0.3rem] p-1 mr-10"
							onClick={() => {
								setStatus(false);
							}}>
							<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
						</svg>
					</div>
				</div>

				<div className="border border-gray-400 mt-6 w-[95vw] max-w-[89%]"></div>

				<div className="flex">
					<h3 className="font-bold text-gray-800 text-[1.5rem] pl-5 pt-6">
						LISTS
					</h3>
				</div>
				<div>
					<ul>
						{list.map(
							(x: string, index: number) =>
								index !== 0 && (
									<li
										key={index}
										id={`${index}`}
										onClick={() => {
											show_list_data(`list-${index}`);
											modify_focus_index(index);
										}}
										className={`ml-7 pl-[1.6rem] pt-2 text-[1.2rem] hover:bg-gray-300 
									w-[75%] rounded-lg mt-[0.2rem] pb-2 font-medium text-gray-800 ${
										list_focus_index == index ? "bg-gray-400" : ""
									}`}>
										{x}
									</li>
								)
						)}
					</ul>
					<div
						onBlur={(e) => {
							if (!e.currentTarget.contains(e.relatedTarget)) {
								showAddNew("hidden");
							}
						}}>
						<input
							type="text"
							placeholder="List name"
							className={
								add_new +
								" ml-7 mt-2 mb-1 pl-7 w-[75%] rounded-[0.3rem] bg-gray-300 p-2 focus:outline-none"
							}
							ref={inputRef}
							maxLength={10}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									let tracker: string | null =
										localStorage.getItem("list-tracker");

									if (tracker == null) {
										localStorage.setItem("list-tracker", "1");
										tracker = "0";
									}

									localStorage.setItem(
										"list-" + tracker,
										e.currentTarget.value
									);

									let val: number = Number(tracker);
									localStorage.setItem("list-tracker", `${++val}`);
									updateList(val);
									e.currentTarget.value = "";
								}
							}}></input>

						<div className="flex">
							<button
								type="button"
								className="flex gap-2 ml-7 mt-2 pt-2 hover:bg-gray-300 w-[75%]
							p-2 rounded-lg border-solid border-black "
								onClick={() => showAddNew("")}>
								<svg viewBox="0 0 448 512" width={14} height={24}>
									<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
								</svg>
								<span className="font-medium whitespace-nowrap">
									Add new list
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Menu;

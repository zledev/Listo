import React, { useEffect, useRef, useState, type ReactNode } from "react";
import bin from "./assets/bin.svg";

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
						className="hover:fill-gray-800 rounded-[0.3rem] p-1 mr-10 ml-3 mt-10.5"
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
							className="fill-gray-800 hover:fill-gray-400 rounded-[0.3rem] p-1 mr-10"
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
					<div className="h-fit w-full flex justify-end">
						<svg
							className="w-7 fill-[#71717A] hover:fill-red-600 
							focus:fill-red-600 mt-3.5 mr-12"
							width="50px"
							height="50px"
							viewBox="0 0 24 24"
							onClick={() => {
								localStorage.clear();
								window.location.reload();
							}}
							xmlns="http://www.w3.org/2000/svg">
							<path d="M1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25V3.75ZM22.5 5.25C22.9142 5.25 23.25 4.91421 23.25 4.5C23.25 4.08579 22.9142 3.75 22.5 3.75V5.25ZM1.5 5.25H22.5V3.75H1.5V5.25Z" />
							<path d="M9.75 1.5V0.75V1.5ZM8.25 3H7.5H8.25ZM7.5 4.5C7.5 4.91421 7.83579 5.25 8.25 5.25C8.66421 5.25 9 4.91421 9 4.5H7.5ZM15 4.5C15 4.91421 15.3358 5.25 15.75 5.25C16.1642 5.25 16.5 4.91421 16.5 4.5H15ZM15.75 3H16.5H15.75ZM14.25 0.75H9.75V2.25H14.25V0.75ZM9.75 0.75C9.15326 0.75 8.58097 0.987053 8.15901 1.40901L9.21967 2.46967C9.36032 2.32902 9.55109 2.25 9.75 2.25V0.75ZM8.15901 1.40901C7.73705 1.83097 7.5 2.40326 7.5 3H9C9 2.80109 9.07902 2.61032 9.21967 2.46967L8.15901 1.40901ZM7.5 3V4.5H9V3H7.5ZM16.5 4.5V3H15V4.5H16.5ZM16.5 3C16.5 2.40326 16.2629 1.83097 15.841 1.40901L14.7803 2.46967C14.921 2.61032 15 2.80109 15 3H16.5ZM15.841 1.40901C15.419 0.987053 14.8467 0.75 14.25 0.75V2.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L15.841 1.40901Z" />
							<path d="M9 17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25H9ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75H10.5ZM10.5 17.25V9.75H9V17.25H10.5Z" />
							<path d="M13.5 17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25H13.5ZM15 9.75C15 9.33579 14.6642 9 14.25 9C13.8358 9 13.5 9.33579 13.5 9.75H15ZM15 17.25V9.75H13.5V17.25H15Z" />
							<path d="M18.865 21.124L18.1176 21.0617L18.1176 21.062L18.865 21.124ZM17.37 22.5L17.3701 21.75H17.37V22.5ZM6.631 22.5V21.75H6.63093L6.631 22.5ZM5.136 21.124L5.88343 21.062L5.88341 21.0617L5.136 21.124ZM4.49741 4.43769C4.46299 4.0249 4.10047 3.71818 3.68769 3.75259C3.2749 3.78701 2.96818 4.14953 3.00259 4.56231L4.49741 4.43769ZM20.9974 4.56227C21.0318 4.14949 20.7251 3.78698 20.3123 3.75259C19.8995 3.7182 19.537 4.02495 19.5026 4.43773L20.9974 4.56227ZM18.1176 21.062C18.102 21.2495 18.0165 21.4244 17.878 21.5518L18.8939 22.6555C19.3093 22.2732 19.5658 21.7486 19.6124 21.186L18.1176 21.062ZM17.878 21.5518C17.7396 21.6793 17.5583 21.75 17.3701 21.75L17.3699 23.25C17.9345 23.25 18.4785 23.0379 18.8939 22.6555L17.878 21.5518ZM17.37 21.75H6.631V23.25H17.37V21.75ZM6.63093 21.75C6.44274 21.75 6.26142 21.6793 6.12295 21.5518L5.10713 22.6555C5.52253 23.0379 6.06649 23.25 6.63107 23.25L6.63093 21.75ZM6.12295 21.5518C5.98449 21.4244 5.89899 21.2495 5.88343 21.062L4.38857 21.186C4.43524 21.7486 4.69172 22.2732 5.10713 22.6555L6.12295 21.5518ZM5.88341 21.0617L4.49741 4.43769L3.00259 4.56231L4.38859 21.1863L5.88341 21.0617ZM19.5026 4.43773L18.1176 21.0617L19.6124 21.1863L20.9974 4.56227L19.5026 4.43773Z" />
						</svg>
					</div>
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
									w-[81%] rounded-lg mt-[0.2rem] pb-2 font-medium text-gray-800 ${
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
								" ml-7 mt-2 mb-1 pl-7 w-[81%] rounded-[0.3rem] bg-gray-300 p-2 focus:outline-none"
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
								className="flex gap-2 ml-7 mt-2 pt-2 hover:bg-gray-300 w-[81%]
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

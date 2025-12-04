"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
	const { data, isLoading } = useSWR("/ninjas.json", fetcher);
	const [number, setNumber] = useState<number>(0);

	if (isLoading) return <div>Loading...</div>;
	const ninja = data["ninjas"][number];
	if (!ninja) return <div>No ninja found</div>;
	
	const addNumber = (increment: number) => {
		let newNumber = number + increment;
		if (newNumber >= data["ninjas"].length) newNumber = 0;
		if (newNumber < 0) newNumber = data["ninjas"].length - 1;
		setNumber(newNumber);
	}

	return (
		<div className={"grid grid-cols-[40%_auto] grid-rows-4 h-screen"}>
			<div className={"bg-[#BF6734] col-span-full row-start-1 row-end-3"}></div>

			<h1 className={"uppercase font-header col-start-1 col-end-2 row-start-1 row-end-2 p-6 text-white text-9xl font-bold"}>I&#39;m <span
				className={"text-black"}>a Ninja</span></h1>
			<h2 className={"uppercase font-header col-start-1 col-end-2 row-start-2 row-end-3 px-4 font-bold text-6xl self-end"}>{ninja["title"]}</h2>
			<p className={"col-start-1 col-end-2 row-start-3 row-end-4 px-4 py-2 text-xl"}>{ninja["text"]}</p>
			<img src="/little_substance.png" alt="Little Substance"
				 className={"col-start-2 col-end-3 row-start-1 row-end-5 self-center min-w-full max-h-full pr-20"}/>
			
			<div className={"col-start-2 col-end-3 row-start-3 row-end-5 flex flex-col w-fit h-fit self-end justify-self-end p-10"}>
				<p className={"text-center text-[10rem] font-header leading-30"}><span className={"text-[#BF6734]"}>0</span>{number + 1}</p>
				<div className={"flex border-2 border-white w-full h-fit"}>
					<button onClick={() => addNumber(-1)} className={"cursor-pointer px-6 py-2 w-full border-r-2 border-white"}>{"<"}</button>
					<button onClick={() => addNumber(1)} className={"cursor-pointer px-6 py-2 w-full"}>{">"}</button>
				</div>
			</div>
		</div>
	);
}

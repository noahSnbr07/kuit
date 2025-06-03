'use server';
import { Habit } from "@prisma/client";
import Link from "next/link";

interface _props {
    habits: Habit[];
}

export default async function Recent({ habits }: _props) {

    if (habits.length <= 0) return <i className="opacity-50"> no habits tracked yet ...</i>

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                {habits.map((habit, index) =>
                    <div
                        key={index}
                        className="odd:bg-stack flex p-2 justify-between items-center">
                        <b> {habit.name} </b>
                        <i className="opacity-50"> {habit.created.toLocaleDateString()} - {habit.created.toLocaleTimeString()} </i>
                    </div>
                )}
            </div>
            <Link
                className="opacity-50 underline text-center"
                href={"/home"}>
                <i> show all </i>
            </Link>
        </div>
    );
}
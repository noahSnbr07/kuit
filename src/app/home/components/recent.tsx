'use server';
import database from "@/config/database";
import Link from "next/link";

export default async function Recent() {

    const recentHabits = await database.habit.findMany({ take: 3, orderBy: { created: "desc" } });

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col">
                {recentHabits.map((habit, index) =>
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
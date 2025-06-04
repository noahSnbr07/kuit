'use server';
import { Habit } from "@prisma/client";
import Link from "next/link";

interface _props {
    habits: Habit[];
    take?: number;
}
export default async function HabitList({ habits, take = habits.length }: _props) {

    return (
        <div className="flex flex-col flex-1 overflow">
            {habits.slice(0, take).map((habit: Habit, _index: number) =>
                <Link
                    key={_index}
                    className="flex px-2 py-2 justify-between"
                    href={`/habit/${habit.id}`}>
                    <div className="flex gap-4">
                        <i> {habit.value} </i>
                        <b> {habit.name} </b>
                    </div>
                    <p className="opacity-50"> {habit.created.toLocaleDateString()} </p>
                </Link>
            )}
        </div>
    );
}
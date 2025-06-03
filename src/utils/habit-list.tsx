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
                    href={`/habit/${habit.id}`}
                    key={_index}
                    className="flex px-4 py-2 odd:bg-stack justify-between">
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
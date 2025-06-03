'use server';
import { Habit } from "@prisma/client";

interface _props {
    habits: Habit[];
    take?: number;
}

export default async function HabitList({ habits, take = habits.length }: _props) {

    return (
        <div className="flex flex-col flex-1 overflow">
            {habits.slice(0, take).map((habit: Habit, _index: number) =>
                <div
                    key={_index}
                    className="flex px-4 py-2 odd:bg-stack justify-between">
                    <div className="flex gap-4">
                        <i> {habit.value} </i>
                        <b> {habit.name} </b>
                    </div>
                    <p className="opacity-50"> {habit.created.toLocaleDateString()} </p>
                </div>
            )}
        </div>
    );
}
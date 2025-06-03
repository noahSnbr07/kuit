'use server';
import HabitList from "@/utils/habit-list";
import { Habit } from "@prisma/client";
import Link from "next/link";

interface _props {
    habits: Habit[];
}

export default async function Recent({ habits }: _props) {

    if (habits.length <= 0) return <i className="opacity-50"> no habits tracked yet ...</i>

    return (
        <div className="flex flex-col gap-2">
            <HabitList
                take={3}
                habits={habits} />
            <Link
                className="opacity-50 underline text-center"
                href={"/list"}>
                <i> show all </i>
            </Link>
        </div>
    );
}
'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import HabitList from "@/utils/habit-list";
import { Habit } from "@prisma/client";
import { redirect } from "next/navigation";

interface _props {

}

export default async function page({ }: _props) {

    const auth = await getAuth();
    if (!auth) redirect("/");

    const habits = await database.habit.findMany({ where: { userId: auth.id } });

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <b> See your tracked habits </b>
            <div className="flex flex-col flex-1 overflow-y-scroll">
                <HabitList habits={habits} />
            </div>
        </div>
    );
}
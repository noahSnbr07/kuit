'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import HabitList from "@/utils/habit-list";
import { redirect } from "next/navigation";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/");

    const habits = await database.habit.findMany({ where: { userId: auth.id } });

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <b> See your tracked habits </b>
            <div className="bg-stack rounded-md p-2">
                <HabitList habits={habits} />
            </div>
        </div>
    );
}
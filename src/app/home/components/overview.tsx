'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";

export default async function Overview() {

    const auth = await getAuth();
    if (auth === null) redirect("/");

    const habits = await database.habit.findMany();

    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <i> tracking: {habits.length} </i>
            </div>
            <div className="size-16 rounded-full bg-stack aspect-square grid place-items-center">
                <b> {124} </b>
            </div>
        </div>
    );
}
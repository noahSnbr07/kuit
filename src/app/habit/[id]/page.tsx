'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import getFullDelta from "@/utils/get-full-delta";
import getTotalScore from "@/utils/get-total-score";
import { redirect } from "next/navigation";
import DeleteButton from "../components/delete-button";

export default async function page({ params }: { params: Promise<{ id: string }> }) {

    // check auth
    const auth = await getAuth();
    if (!auth) redirect("/");

    //retrieve habit
    const id = (await params).id;
    const habit = await database.habit.findUnique({ where: { id, userId: auth.id } });
    if (!habit) redirect("/");

    const timeTracking = getFullDelta({ dateStart: habit.created, dateStop: new Date() });
    const totalValue = await getTotalScore({ habit });

    return (
        <div className="size-full flex flex-col p-4 gap-4">
            <b> Detailed habit view </b>
            <div className="flex flex-col gap-2">
                <HabitProp
                    identifier="Created"
                    value={`${habit.created.toLocaleDateString()} - ${habit.created.toLocaleTimeString()}`}
                />
                <HabitProp
                    identifier="Delta Time"
                    value={timeTracking}
                />
                <HabitProp
                    identifier="Value"
                    value={`${habit.value} Score points`}
                />
                <HabitProp
                    identifier="Generated Score"
                    value={`${totalValue} Score points`}
                />
            </div>
            <DeleteButton id={habit.id} />
        </div>
    );
}

function HabitProp({ identifier, value }: { identifier: string; value: string | number; }) {

    return (
        <div className="bg-stack flex px-4 py-2 gap-4 rounded-md">
            <i className="opacity-50 flex-1"> {identifier} </i>
            <b className="flex-1"> {value} </b>
        </div>
    );
}
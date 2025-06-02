'use server';

import database from "@/config/database";
import getFullDelta from "@/utils/get-full-delta";
import getScore from "@/utils/get-score";

export default async function Overview() {

    const total = await database.habit.count();
    const longest = await database.habit.findMany(
        {
            select: { created: true },
            take: 1,
            orderBy: { created: "asc" }
        });

    // get longest duration
    const longestStreak = longest[0].created;
    const deltaTime = getFullDelta({
        dateStart: longestStreak,
        dateStop: new Date(),
    });

    // calculate total score
    const score = await getScore();

    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <span> <i>Tracking: </i> <b>{total}</b> </span>
                <span> <i>Longest: </i> <b>{deltaTime}</b> </span>
            </div>
            <div className="size-16 border-accent border-2 rounded-full bg-stack aspect-square grid place-items-center">
                <b className="text-accent"> {score} </b>
            </div>
        </div>
    );
}
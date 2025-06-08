'use server';

import getDailyValue from "@/utils/get-daily-value";
import getFullDelta from "@/utils/get-full-delta";
import getScore from "@/utils/get-score";
import { Habit } from "@prisma/client";

interface _props {
    habits: Habit[];
}

export default async function Overview({ habits }: _props) {

    if (habits.length <= 0) return <i className="opacity-50"> no habits tracked yet ... </i>

    // get longest duration
    const longestStreak = habits[0].created;
    const deltaTime = getFullDelta({
        dateStart: longestStreak,
        dateStop: new Date(),
    });

    // calculate total score
    const score = await getScore({ habits });

    // calculate daily value
    const dailyValue = await getDailyValue({ habits });

    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <span> <i>Tracking: </i> <b>{habits.length}</b> </span>
                <span> <i>Longest: </i> <b>{deltaTime}</b> </span>
                <span> <i>Est. Value/Day: </i> <b>{dailyValue}</b> </span>
            </div>
            <div className="size-16 border-accent border-2 rounded-full bg-stack aspect-square grid place-items-center">
                <b className="text-accent"> {score} </b>
            </div>
        </div>
    );
}
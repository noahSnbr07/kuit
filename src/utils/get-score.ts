import { Habit } from "@prisma/client";
import { differenceInDays } from "date-fns";
import severityToNumber from "./severity-to-number";

interface _props {
    habits: Habit[];
}

export default async function getScore({ habits }: _props): Promise<number> {
    const today = new Date();


    //sum = n-habits * severity factor * days passed
    return habits.reduce((sum: number, habit) => sum + differenceInDays(today, habit.created) * severityToNumber({ severity: habit.severity }), 0);
}
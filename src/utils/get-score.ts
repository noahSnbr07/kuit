import { Habit } from "@prisma/client";
import { differenceInDays } from "date-fns";

interface _props {
    habits: Habit[];
}

export default async function getScore({ habits }: _props): Promise<number> {
    const today = new Date();


    //sum = n-habits * severity factor * days passed
    return habits.reduce((sum: number, habit) => sum + differenceInDays(today, habit.created) * habit.value, 0);
}

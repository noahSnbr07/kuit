import { Habit } from "@prisma/client";
import { differenceInHours } from "date-fns";

interface _props {
    habits: Habit[];
}

export default async function getScore({ habits }: _props): Promise<number> {
    const today = new Date();

    return habits.reduce((sum: number, habit) =>
        sum + differenceInHours(today, habit.created), 0);
}

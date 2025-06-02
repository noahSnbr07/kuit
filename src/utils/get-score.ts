import database from "@/config/database";
import { differenceInHours } from "date-fns";

export default async function getScore(): Promise<number> {
    const habits = await database.habit.findMany({ select: { created: true } });
    const today = new Date();

    return habits.reduce((sum: number, habit) =>
        sum + differenceInHours(today, habit.created), 0);
}

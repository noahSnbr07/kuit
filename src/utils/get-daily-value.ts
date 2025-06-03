'use server';
import { Habit } from "@prisma/client";

interface _props {
    habits: Habit[];
}

export default async function getDailyValue({ habits }: _props): Promise<number> {

    return habits.reduce(function (sum: number, habit: Habit) {
        return sum + habit.value;
    }, 0);

}
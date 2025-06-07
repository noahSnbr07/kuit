'use server';
import { Habit } from "@prisma/client";
import { differenceInDays } from "date-fns";

interface _props {
    habit: Habit;
}

export default async function getTotalScore({ habit }: _props) {

    const days = differenceInDays(new Date(), habit.created);
    return days * habit.value;

}
'use server';

import Card from "./components/card";
import Overview from "./components/overview";
import Recent from "./components/recent";
import Navigation from "./components/navigation";
import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";
import database from "@/config/database";
import Motivation from "./components/motivation";
import CoderCat from "./components/coder-cat";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/authentication");

    const habits = await database.habit.findMany({ where: { userId: auth.id } });

    return (
        <div className="size-full p-4 flex flex-col gap-4">
            <Card
                title="Overview">
                <Overview habits={habits} />
            </Card>
            <Card
                title="Recent">
                <Recent habits={habits} />
            </Card>
            <Card
                title="Navigation">
                <Navigation />
            </Card>
            <Card
                title="Quote">
                <Motivation />
            </Card>
            <Card
                title="Feedback">
                <CoderCat />
            </Card>
        </div>
    );
}
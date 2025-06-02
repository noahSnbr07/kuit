'use server';

import Card from "./components/card";
import Overview from "./components/overview";
import Recent from "./components/recent";
import Navigation from "./components/navigation";
import getAuth from "@/functions/get-auth";
import { redirect, RedirectType } from "next/navigation";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/authentication", RedirectType.replace);

    return (
        <div className="size-full p-4 flex flex-col gap-4">
            <Card
                title="Overview">
                <Overview />
            </Card>
            <Card
                title="Recent">
                <Recent />
            </Card>
            <Card
                title="Navigation">
                <Navigation />
            </Card>
        </div>
    );
}
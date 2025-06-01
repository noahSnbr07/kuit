'use server';

import Card from "./components/card";
import Overview from "./components/overview";
import Recent from "./components/recent";
import Navigation from "./components/navigation";

export default async function page() {


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
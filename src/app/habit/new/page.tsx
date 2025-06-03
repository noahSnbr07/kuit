'use server';

import getAuth from "@/functions/get-auth";
import Form from "../components/form";
import { redirect } from "next/navigation";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/authentication");

    return (
        <div className="size-full p-4 flex flex-col gap-4">
            <b> Create New Habit </b>
            <Form />
        </div>
    );
}
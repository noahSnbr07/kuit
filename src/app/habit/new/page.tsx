'use server';

import Form from "../components/form";

export default async function page() {


    return (
        <div className="size-full p-4 flex flex-col gap-4">
            <b> Create New Habit </b>
            <Form />
        </div>
    );
}
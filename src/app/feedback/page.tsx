'use server';

import Form from "./components/form";

export default async function page() {


    return (
        <div className="flex flex-col gap-4 p-4">
            <b> Help to improve my app {"<3"} </b>
            <Form />
        </div>
    );
}
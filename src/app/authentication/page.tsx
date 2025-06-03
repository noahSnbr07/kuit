'use server';

import Form from "./components/form";

export default async function page() {

    return (
        <div className="size-full grid place-content-center">
            <Form />
        </div>
    );
}
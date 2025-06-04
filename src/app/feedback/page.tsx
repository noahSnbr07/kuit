'use server';

import Form from "./components/form";

interface _props {

}

export default async function page({ }: _props) {


    return (
        <div className="flex flex-col gap-4 p-4">
            <b> Help to improve my app </b>
            <Form />
        </div>
    );
}
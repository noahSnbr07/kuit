'use server';
import React from "react";

interface _props {
    endpoint?: string;
    action: () => Promise<void>;
    title: string;
    icon: React.JSX.Element;
}

export default async function ActionButton({ endpoint, action, title, icon }: _props) {

    return (
        <form
            method="POST"
            action={endpoint || action}
            className="bg-stack rounded-lg"
        >
            <button
                className="p-4 flex gap-4 items-center size-full"
                type="submit">
                {icon}
                <b> {title} </b>
            </button>
        </form>
    );
}
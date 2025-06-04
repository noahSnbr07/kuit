import React from "react";

interface _props {
    title: string;
    children: React.ReactNode;
}

export default async function Card({ title, children }: _props) {

    return (
        <div
            className="flex flex-col rounded-lg gap-2 p-4 bg-stack backdrop-blur-sm">
            <b className="text-xs opacity-50"> {title} </b>
            {children}
        </div>
    );
}
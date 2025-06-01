'use server';
import React from "react";



interface _props {
    title: string;
    children: React.ReactNode;
}

export default async function Wrapper({ title, children }: _props) {


    return (
        <div className="size-full flex flex-col">
            <header className="bg-stack p-4 gap-4">
                <nav>
                    {title}
                </nav>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
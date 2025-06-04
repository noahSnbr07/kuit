'use server';
import { banner } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface _props {
    title: string;
    children: React.ReactNode;
}

export default async function Wrapper({ title, children }: _props) {


    return (
        <div className="size-full flex flex-col">
            <header className="bg-stack p-4 gap-4 backdrop-blur-sm">
                <nav className="flex gap-4 items-center">
                    <Link
                        href={"/home"}>
                        <Image
                            height={24}
                            alt="Logo"
                            title="Logo"
                            src={banner} />
                    </Link>
                    <b> {title} </b>
                </nav>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
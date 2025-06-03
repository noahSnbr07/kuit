'use server';
import { List, Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Navigation() {

    return (
        <div className="grid grid-cols-2 gap-2">
            <Link
                href={"/habit/new"}
                className="flex items-center gap-2">
                <Plus opacity={.5} size={16} />
                <b> Create </b>
            </Link>
            <Link
                href={"/list"}
                className="flex items-center gap-2">
                <List opacity={.5} size={16} />
                <b> Habits </b>
            </Link>
            <Link
                href={"/settings"}
                className="flex items-center gap-2">
                <Settings2 opacity={.5} size={16} />
                <b> Settings </b>
            </Link>
        </div>
    );
}
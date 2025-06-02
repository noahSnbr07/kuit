'use server';
import { Camera, LogOut, Plus, Settings2 } from "lucide-react";
import Link from "next/link";



export default async function Navigation() {

    return (
        <div className="grid grid-cols-2 gap-2">
            <Link
                href={"/settings"}
                className="flex items-center gap-2">
                <Settings2 opacity={.5} size={16} />
                <b> Settings </b>
            </Link>
            <Link
                href={"/api/authentication/logout"}
                className="flex items-center gap-2">
                <LogOut opacity={.5} size={16} />
                <b> Logout </b>
            </Link>
            <Link
                target="_blank"
                href={"/create"}
                className="flex items-center gap-2">
                <Plus opacity={.5} size={16} />
                <b> Create </b>
            </Link>
            <Link
                target="_blank"
                href={"https://instaagram.com/noah.codes.stuff/"}
                className="flex items-center gap-2">
                <Camera opacity={.5} size={16} />
                <b> Social </b>
            </Link>
        </div>
    );
}
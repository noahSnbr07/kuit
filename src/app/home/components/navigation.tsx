'use server';
import { Camera, Code, LogOut, Settings2 } from "lucide-react";
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
                href={"https://instaagram.com/noah.codes.stuff/"}
                className="flex items-center gap-2">
                <Camera opacity={.5} size={16} />
                <b> Social </b>
            </Link>
            <Link
                target="_blank"
                href={"https://github.com/noahSnbr07/kuit"}
                className="flex items-center gap-2">
                <Code opacity={.5} size={16} />
                <b> Codebase </b>
            </Link>
        </div>
    );
}
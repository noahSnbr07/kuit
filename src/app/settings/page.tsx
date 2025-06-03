'use server';

import { LogOut } from "lucide-react";
import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";
import logout from "@/functions/logout";
import LogoutButton from "./components/logout-button";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/authentication");

    return (
        <div className="size-full flex flex-col p-4 gap-4">
            <LogoutButton />
        </div>
    );
}
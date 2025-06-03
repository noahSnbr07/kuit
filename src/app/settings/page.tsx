'use server';

import { LogOut } from "lucide-react";
import ActionButton from "./components/action-button";
import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";
import logout from "@/functions/logout";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/authentication");

    return (
        <div className="size-full flex flex-col p-4 gap-4">
            <ActionButton
                action={logout}
                icon={<LogOut size={16} />}
                title="Logout"
            />
        </div>
    );
}
'use server';
import logout from "@/functions/logout";
import { LogOut } from "lucide-react";
import React from "react";

export default async function LogoutButton() {

    return (
        <form
            method="POST"
            action={logout}
            className="bg-stack rounded-lg backdrop-blur-sm"
        >
            <button
                className="p-4 flex gap-4 items-center size-full"
                type="submit">
                <LogOut style={{ opacity: .5 }} size={16} />
                <b> Logout </b>
            </button>
        </form>
    );
}
'use client';

import Warn from "@/app/components/warn";
import APIResponse from "@/interfaces/api-response";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface _props {
    id: string;
}
export default function DeleteButton({ id }: _props) {

    const [pending, setPending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    async function deleteHandler() {
        setPending(true);

        try {
            const response = await fetch(`/api/habit/delete/${id}`, { method: "POST", });
            const data: APIResponse = await response.json();
            if (data.success) router.push("/home");
            setMessage(data.message || "");
        }
        finally {
            setPending(false);
        }
    }

    return (
        <>
            <button
                disabled={pending}
                style={{ opacity: pending ? .5 : 1 }}
                onClick={deleteHandler}
                className="bg-red-800 font-bold p-4 w-full rounded-md"> Delete </button>
            {message.length > 0 && <Warn message={message} />}
        </>
    );
}
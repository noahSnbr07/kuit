'use client';

import Warn from "@/app/components/warn";
import APIResponse from "@/interfaces/api-response";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Form() {

    const ref = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    async function handleSubmit() {

        //catch resubmit
        if (pending) return;
        setPending(true);

        //ensure valid form
        if (!ref || !ref.current) return setMessage("Something went wrong");

        //construct request
        const formData = new FormData(ref.current);
        const response = await fetch(`/api/habit/create`, {
            method: 'POST',
            body: formData,
        });

        const data: APIResponse = await response.json();
        setMessage(data.message || "");

        //redirect on success
        if (data.status === 200 && !data.error && data.success) router.push("/home");
        setPending(false);
    }

    return (
        <form
            method="POST"
            ref={ref}
            className="flex flex-col gap-4 w-full">
            <input
                required
                name="name"
                type="text"
                className="px-2 py-1 bg-stack rounded-md backdrop-blur-sm"
                placeholder="name"
            />

            <i className="opacity-50 text-sm"> 1: Normal, 2: Intermediate, 3: Hard </i>
            <input
                autoFocus
                required
                defaultValue={2}
                min={1}
                max={3}
                type="range"
                name="value"
            />
            <button
                disabled={pending}
                style={{ opacity: pending ? .5 : 1 }}
                type="button"
                onClick={() => handleSubmit()}
                className="p-2 font-bold text-lg bg-accent rounded-md">
                {pending ? <ClipLoader size={16} color="rgba(255, 25, 255, .25)" /> : "Create new Habit"}
            </button>

            {message.length > 1 && <Warn message={message} />}
        </form>
    );
}
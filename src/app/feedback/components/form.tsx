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
        const response = await fetch(`/api/feedback/create`, {
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
                autoFocus
                required
                name="name"
                type="text"
                className="px-2 py-1 bg-stack rounded-md"
                placeholder="name"
            />

            <i className="opacity-50 text-sm"> Rating- 1: Worst, 5: Best </i>
            <input
                required
                defaultValue={3}
                min={1}
                max={5}
                type="range"
                name="rating"
            />
            <textarea
                className="bg-stack rounded-md px-2 py-1"
                placeholder="What is your feedback?"
                required
                rows={8}
                maxLength={200}
                name="body"
            />
            <button
                disabled={pending}
                style={{ opacity: pending ? .5 : 1 }}
                type="button"
                onClick={() => handleSubmit()}
                className="p-2 font-bold text-lg bg-accent rounded-md">
                {pending ? <ClipLoader size={16} color="rgba(255, 25, 255, .25)" /> : "Submit Feedback"}
            </button>

            {message.length > 1 && <Warn message={message} />}
        </form>
    );
}
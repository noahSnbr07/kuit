'use client';

import Warn from '@/app/components/warn';
import APIResponse from '@/interfaces/api-response';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Form() {

    // grab the form
    const formRef = useRef<HTMLFormElement>(null);

    // track state and feedback
    const [message, setMessage] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);

    // for redirection
    const router = useRouter();

    async function handleSubmit(action: 'login' | 'register') {

        // rate limiting
        if (pending) return;
        setPending(true);

        // ensure valid form
        if (!formRef.current) return setMessage("Something went wrong");

        // construct submission and call endpoint
        const formData = new FormData(formRef.current);
        const response = await fetch(`/api/authentication/${action}`, {
            method: 'POST',
            body: formData,
        });

        // evaluate response and provide feedback
        const data: APIResponse = await response.json();
        setMessage(data.message || "");

        //redirect on success
        if (data.status === 200 && data.success) router.push("/home");
        setPending(false);
    }

    return (
        <form
            ref={formRef}
            className="flex flex-col p-4 gap-4 border-2 border-stack rounded-lg"
        >
            <b className="text-center"> Welcome Back </b>
            <input
                className="px-4 py-2 rounded-md bg-stack"
                type="text"
                name="name"
                placeholder="name"
                required
            />
            <input
                className="px-4 py-2 rounded-md bg-stack"
                type="password"
                name="password"
                placeholder="password"
                required
            />
            <div
                style={{ opacity: pending ? .5 : 1, cursor: pending ? "not-allowed" : "pointer" }}
                className="flex gap-4">
                <button
                    disabled={pending}
                    type="button"
                    onClick={() => handleSubmit('register')}
                    className="flex-1 p-1 border-2 border-stack rounded-md font-bold"
                >
                    {pending ? <ClipLoader size={16} color='rgba(255, 255, 255, .5)' /> : "Register"}
                </button>
                <button
                    disabled={pending}
                    type="button"
                    onClick={() => handleSubmit('login')}
                    className="flex-1 p-1 bg-accent rounded-md font-bold"
                >
                    {pending ? <ClipLoader size={16} color='rgba(255, 255, 255, .5)' /> : "Login"}
                </button>
            </div>
            {message && <Warn message={message} />}
        </form>
    );
}
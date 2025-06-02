"use server";

import Authentication from "@/interfaces/authentication";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getAuth(): Promise<Authentication | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")!.value;
        if (!token) return null;

        const jwtSecret = process.env.JWT_SECRET as string;
        const auth = verify(token, jwtSecret);
        return auth as Authentication;
    } catch {
        return null;
    }
}

"use server";

import Authentication from "@/interfaces/authentication";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getAuth(): Promise<Authentication> {

    //retrieve token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")!.value as string;

    //parsing secret
    const jwtSecret = process.env.JWT_SECRET as string;

    //return decoded token
    const auth = verify(token, jwtSecret);
    return auth as Authentication;
}
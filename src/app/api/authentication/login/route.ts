import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import database from "@/config/database";
import { cookies } from "next/headers";

/** 
 * @param _request Nextjs Response Extension
 * @returns `NextResponse` with custom interface attached
 */
export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //read form data
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const jwtSecret = process.env.JWT_SECRET as string;

    //retrieve cookies
    const cookieStore = await cookies();

    //check validity of data
    const validName: boolean = name != null && name.length >= 4;
    const validPassword: boolean = password != null && password.length >= 4;

    //! catch invalid form schema
    if (!validName || !validPassword) return NextResponse.json({
        success: false,
        message: "Invalid Credentials",
        status: 400,
        data: null,
    });

    try {
        //retrieve user from name
        const user = await database.user.findUnique({ where: { name: name } });

        //! catch missing form user
        if (!user) return NextResponse.json({
            success: false,
            message: "User not found",
            status: 404,
            data: null,
        });

        //compare hashes
        const match: boolean = await compare(password, user.hash);

        //! catch invalid hash
        if (!match) return NextResponse.json({
            success: false,
            message: "Hash mismatch",
            status: 403,
            data: null,
        });

        //sign auth token
        const token: string = sign({
            name: user.name,
            id: user.id,
        }, jwtSecret, {
            algorithm: "HS256",
            issuer: "KUIT",
            expiresIn: "24h",
        });

        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60,
            sameSite: "lax",
        });

        //! successful authentication of identity
        return NextResponse.json({
            success: true,
            message: "Hash match",
            status: 200,
            data: null,
        });


    } catch (error) {

        //! catch uncaught exception
        return NextResponse.json({
            success: false,
            message: "Uncaught Exception",
            status: 500,
            error: error instanceof Error ? error : "Uncaught Exception",
            data: null,
        });
    }
}

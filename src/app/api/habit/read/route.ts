import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import APIResponse from "@/interfaces/api-response";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<APIResponse>> {

    // check auth
    const auth = await getAuth();

    //! catch auth fail
    if (auth === null) return NextResponse.json({
        data: null,
        message: "Authentication failed",
        status: 403,
        success: false,
    });

    try {

        // retrieve user
        const user = await database.user.findUnique({
            where: { id: auth.id },
            include: { tracking: true },
        });
        if (!user) return NextResponse.json({
            data: null,
            message: "User not found",
            status: 404,
            success: false,
        });

        //return habits
        return NextResponse.json({
            data: { habits: user.tracking },
            message: "Habits retrieved successfully",
            status: 200,
            success: false,
        });

    } catch (error) {

        //! catch unhandled exception
        return NextResponse.json({
            data: null,
            error: error instanceof Error ? error : "Uncaught exception",
            message: "Authentication failed",
            status: 403,
            success: false,
        });
    }
}
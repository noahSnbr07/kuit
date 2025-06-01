import APIResponse from "@/interfaces/api-response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<APIResponse>> {

    //retrieve cookies
    const cookieStore = await cookies();

    try {

        // attempt deletion of token
        cookieStore.delete("token");
        return NextResponse.json({
            data: null,
            message: "Logged out successfully",
            status: 200,
            success: true,
        });
    } catch (error) {

        //! handle possible exception
        return NextResponse.json({
            data: null,
            error: error instanceof Error ? error : "Uncaught exception",
            message: "Uncaught Exception",
            status: 500,
            success: false,
        });
    }

}
import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    // retrieve form data
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const value = Number(formData.get("value") as string);

    // retrieve auth state
    const auth = await getAuth();

    // check validity
    const validName: boolean = name != null && name.length >= 4;
    const validValue: boolean = value > 0 && value < 4;

    //! catch unauthenticated resource access
    if (!auth) return NextResponse.json({
        data: null,
        message: "Authentication failed",
        status: 403,
        success: false,
    });

    //! catch invalid form schema
    if (!validName || !validValue) return NextResponse.json({
        data: null,
        message: "Invalid form data",
        status: 400,
        success: false,
    });

    try {

        const newHabit = await database.habit.create({ data: { name, value, userId: auth.id }, });

        //! return data of new snippet
        return NextResponse.json({
            data: null,
            message: `"${newHabit.name}" created successfully`,
            status: 200,
            success: true,
        });


    } catch (error) {
        //! catch unhandled errors
        return NextResponse.json({
            data: null,
            message: "Invalid form data",
            status: 400,
            success: false,
            error: error instanceof Error ? error : "Uncaught Exception"
        });
    }
}
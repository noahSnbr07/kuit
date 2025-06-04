import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    // retrieve form data
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const rating = Number(formData.get("rating") as string);
    const body = formData.get("body") as string;

    // retrieve auth state
    const auth = await getAuth();

    // check validity
    const validName: boolean = name != null && name.length >= 4;
    const validRating: boolean = rating > 0 && rating < 6;
    const validBody: boolean = body.length > 0;

    console.log({ validName, validRating, validBody, rating })

    //! catch unauthenticated resource access
    if (!auth) return NextResponse.json({
        data: null,
        message: "Authentication failed",
        status: 403,
        success: false,
    });

    //! catch invalid form schema
    if (!validName || !validRating || !validBody) return NextResponse.json({
        data: null,
        message: "Invalid form data",
        status: 400,
        success: false,
    });

    try {

        const newRating = await database.feedback.create({ data: { name, rating, body }, });

        //! return data of new snippet
        return NextResponse.json({
            data: null,
            message: `"${newRating.name}" created successfully`,
            status: 200,
            success: true,
        });


    } catch (error) {
        console.log(error)
        //! catch unhandled errors
        return NextResponse.json({
            data: null,
            message: "Uncaught Error",
            status: 400,
            success: false,
            error: error instanceof Error ? error : "Uncaught Exception"
        });
    }
}
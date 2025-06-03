import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    // retrieve form data
    const formDate = await _request.formData();
    const id = formDate.get("id") as string;
    const validId: boolean = id !== null && id.length > 0;

    // check resource access
    const auth = await getAuth();

    //! catch unauthorized access
    if (auth === null) return NextResponse.json({
        data: null,
        message: "Authentication failed",
        status: 403,
        success: false,
    });

    //! catch invalid id
    if (!validId) return NextResponse.json({
        data: null,
        message: "Invalid id",
        status: 400,
        success: false,
    });

    try {
        //retrieve target habit
        const targetHabit = await database.habit.findUnique({ where: { id, userId: auth.id } });

        //! catch invalid target habit id
        if (!targetHabit) return NextResponse.json({
            data: null,
            message: "Habit not found",
            status: 404,
            success: false,
        });

        //retrieve target user
        const targetUser = await database.user.findUnique(
            {
                where: { id: auth.id },
                include: { tracking: true },
            });

        //! catch invalid target user
        if (!targetUser) return NextResponse.json({
            data: null,
            message: "User not found",
            status: 404,
            success: false,
        });

        // update user following field
        await database.user.update({
            where: { id: auth.id },
            data: {
                tracking: {
                    disconnect: { id: targetHabit.id },
                },
            },
        });

        //! success
        return NextResponse.json({
            data: null,
            message: "Removed habit successfully",
            status: 200,
            success: true,
        });


    } catch (error) {

        //! catch unhandled exception
        return NextResponse.json({
            data: null,
            error: error instanceof Error ? error : "Uncaught exception",
            message: "Uncaught exception",
            status: 500,
            success: false,
        });
    }
}
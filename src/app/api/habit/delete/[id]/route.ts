import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<APIResponse>> {

    //retrieve data
    const { id } = await params;

    console.log(id)

    //ensure resource access in authorized
    const auth = await getAuth();
    const validId: boolean = id != null && id.length > 0;
    const invalidAuth = auth === null;

    //! catch unauthorized access
    if (invalidAuth) return NextResponse.json({
        data: null,
        message: "Authentication failed",
        status: 403,
        success: false,
    });


    //! catch invalid ids
    if (!validId) return NextResponse.json({
        data: null,
        message: "Invalid id",
        status: 400,
        success: false,
    });

    try {

        // retrieve target
        const target = await database.habit.findUnique({ where: { id, userId: auth.id }, include: { user: true } });

        //! catch missing target
        if (!target) return NextResponse.json({
            data: null,
            message: "Habit not found",
            status: 404,
            success: false,
        });

        // verify ownership
        const ownershipMatch: boolean = auth !== null && (target?.user?.id === auth.id);

        //! catch ownership auth fail
        if (!ownershipMatch) return NextResponse.json({
            data: null,
            message: "Ownership authentication failed",
            status: 403,
            success: false,
        });

        // attempt deletion
        const deleted = await database.habit.delete({ where: { id, userId: auth.id } });
        return NextResponse.json({
            data: { id: deleted.id, name: deleted.name },
            message: `"${deleted.name} deleted successfully"`,
            status: 200,
            success: true,
        });


    } catch (error) {

        //! catch unhandled errors
        return NextResponse.json({
            data: null,
            error: error instanceof Error ? error : "Uncaught Exception",
            message: "Invalid id",
            status: 500,
            success: false,
        });
    }
}
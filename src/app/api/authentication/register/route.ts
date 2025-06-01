import database from "@/config/database";
import APIResponse from "@/interfaces/api-response";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

/** 
 * @param _request Nextjs Response Extension
 * @returns `NextResponse` with custom interface attached
 */
export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //read form data
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

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

        //check weather username is reserved
        const existing = await database.user.findUnique({ where: { name } });
        if (existing) return NextResponse.json({
            success: false,
            status: 500,
            data: null,
            message: "Name reserved",
        });

        //generated hashed password
        const hashedPassword = await hash(password, 16);

        //insert new user
        const newUser = await database.user.create({ data: { name, hash: hashedPassword } });
        return NextResponse.json({
            success: true,
            status: 200,
            data: { id: newUser.id, name: newUser.name },
            message: "User created successfully",
        });

    } catch (error) {

        //! catch uncaught errors
        return NextResponse.json({
            success: false,
            status: 500,
            data: null,
            error: error instanceof Error ? error : "Uncaught Exception",
            message: "Uncaught Exception",
        });
    }
}
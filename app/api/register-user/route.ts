import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json(); 
    const register_api_key = process.env.REGISTER_USER_AUTH;
    const authorization = request.headers.get("Authorization");

    if (authorization === register_api_key) {
        const email = body.email;
        try {
            const result = await sql`INSERT INTO "User" (email)
              VALUES (${email});`
          }
          catch (error) {
          console.error('Error inserting into User:', error);
          return NextResponse.json(
            { message: "Failure", data: error },
            { status: 400 }
          );
        }

      return NextResponse.json(
        { message: "Success", data: "Passed Authorization" },
        { status: 200 }
      );
    }
    else {
      return NextResponse.json(
        { message: "Failure", data: "Failed Authorization" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error reading request body:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

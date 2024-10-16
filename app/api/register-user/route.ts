import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { simpleApiResponse } from "../simpleApi";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const register_api_key = process.env.REGISTER_USER_AUTH;
    const authorization = request.headers.get("Authorization");

    // If user provides proper api key
    if (authorization === register_api_key) {
      
      // Try to add the provided email to the vercel postgresql database
      try {
        const email = body.email;
        const result = await sql`INSERT INTO "User" (email)
              VALUES (${email});`;
      } catch (error) {
        return simpleApiResponse("Failure", "Insertion error", 400);
      }

      return simpleApiResponse("Success", "Passed Authorization", 200);
    } else {
      return simpleApiResponse("Failure", "Failed Authorization", 400);
    }
  } catch (error) {
    console.error("Error reading request body:", error);
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

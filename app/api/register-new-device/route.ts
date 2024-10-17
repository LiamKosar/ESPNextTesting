import { sql } from "@vercel/postgres";
import { simpleApiResponse } from "../simpleApi";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const register_api_key = process.env.ARDUINO_API_KEY;
    const authorization = request.headers.get("Authorization");

    // If user provides proper api key
    if (authorization === register_api_key) {
      // Try to add the provided email to the vercel postgresql database
      try {
        const macAddr = body.macAddr;
        const version = body.version;
        // Calling the sql function to register this email
        const rows = (await sql`select register_device(${macAddr}, ${version})`).rows;
        const result_msg: string = rows[0].register_device;
        if (result_msg.includes("Success")) {
          return simpleApiResponse("Success", "Device registered", 200);
        } else {
          return simpleApiResponse("Failure", result_msg, 400);
        }
      } catch (error) {
        return simpleApiResponse("Failure", "Connection Error", 400);
      }
    } else {
      return simpleApiResponse("Failure", "Failed Authorization", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

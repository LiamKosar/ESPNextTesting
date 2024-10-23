import { simpleApiResponse } from "../simpleApi";
import { prisma } from "@/app/lib/prisma";

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
        const mac_address = body?.mac_address;
        const version = body?.version;
        let dateTime = new Date().toUTCString();
        const user = await prisma.device.create({
          data: {
            mac_address: mac_address,
            version: version,
            date_updated: dateTime
          },
        });
        return simpleApiResponse("Success", "Device created", 200);
      } catch (error) {
        console.log("hi");
        return simpleApiResponse("Failure", "Database Error", 400);
      }
    } else {
      return simpleApiResponse("Failure", "Failed Authorization", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

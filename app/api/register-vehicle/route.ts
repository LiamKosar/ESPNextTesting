import { simpleApiResponse } from "../simpleApi";
import { prisma } from "@/app/lib/prisma";

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
        const mac_address = body?.macAddr;
        const name = body?.name;
        // const image_url = body?.image_url;
        const vehicle = await prisma.vehicle.create({
          data: {
            mac_address: mac_address,
            name: name,
            image_url: "empty"
          },
        });
        return simpleApiResponse("Success", "Device inserted", 200);
      } catch (error) {
        return simpleApiResponse("Failure", "Database Error", 400);
      }
    } else {
      return simpleApiResponse("Failure", "Failed Authorization", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

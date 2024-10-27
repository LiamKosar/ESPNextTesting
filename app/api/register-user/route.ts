import { MdEnergySavingsLeaf } from "react-icons/md";
import { prisma } from "@/app/lib/prisma";
import { simpleResponses } from "../simpleApi";
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
        const email = body?.email;
        const user = await prisma.user.create({
          data: {
            email: email,
          },
        });
      } catch (error) {
        return simpleResponses.simpleApiResponse("Failure", "Database Error", 400);
      }
    } else {
      return simpleResponses.simpleApiResponse("Failure", "Failed Authorization", 400);
    }
  } catch (error) {
    return simpleResponses.simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

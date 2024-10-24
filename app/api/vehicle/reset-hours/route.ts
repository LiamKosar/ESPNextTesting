import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_vehicle_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();
   
    // If user provides proper api key
      // Try to add the provided email to the vercel postgresql database
      try {
        const vehicle_id = Number(body?.vehicle_id);
        const userOwnsVehicle = await authenticate_vehicle_ownership(vehicle_id);
        if (!userOwnsVehicle) {
          return simpleApiResponse("Failure", "Not authorized", 400);
        }

        const updatedVehicle = await prisma.vehicle.update({
            where: {
              vehicle_id: vehicle_id,
            },
            data: {
              runtime: 0,
            },
          });

        return simpleApiResponse("Success", "Runtime reset", 200);
      } catch (error) {
        console.log("hi");
        return simpleApiResponse("Failure", "Database Error", 400);
      }
    }
    catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

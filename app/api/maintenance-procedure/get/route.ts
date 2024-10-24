import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_vehicle_ownership } from "../../authenticate_ownership";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const vehicle_id = Number(url.searchParams.get("vehicle_id"));

    if (!vehicle_id) {
      return simpleApiResponse(
        "Failure",
        "vehicle_id query parameter is required",
        400
      );
    }

    const userOwnsVehicle = await authenticate_vehicle_ownership(vehicle_id);
    if (!userOwnsVehicle) {
      return simpleApiResponse("Failure", "Not authorized", 400);
    }

    try {
      const maintenance_procedures = await prisma.maintenanceprocedure.findMany(
        {
          where: {
            vehicle_id: vehicle_id,
          },
        }
      );

      const response = JSON.stringify(maintenance_procedures);

      return simpleApiResponse("Success", response, 200);
    } catch (error) {
      return simpleApiResponse("Failure", "Database error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Bad request", 400);
  }
}

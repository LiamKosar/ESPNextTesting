import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_vehicle_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();

    try {
      const id = body?.id;
      const vehicle_id = Number(body?.vehicle_id);
      const userOwnsVehicle = await authenticate_vehicle_ownership(vehicle_id);
        if (!userOwnsVehicle) {
          return simpleApiResponse("Failure", "Not authorized", 400);
        }

      const maintenance_procedure = await prisma.maintenanceprocedure.delete({
        where: { id:id, vehicle_id: vehicle_id},
      });

      return simpleApiResponse("Success", "Maintenance procedure deleted", 200);
    } catch (error) {
      return simpleApiResponse("Failure", "Database Error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

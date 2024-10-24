import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_vehicle_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();

    try {
      const id = body?.id;
      const name = body?.name;
      const interval = body?.interval;
      const current_interval = body?.current_interval;
      const description = body?.description;

      const vehicle_id = Number(body?.vehicle_id);
      const userOwnsVehicle = await authenticate_vehicle_ownership(vehicle_id);
        if (!userOwnsVehicle) {
          return simpleApiResponse("Failure", "Not authorized", 400);
        }

      // Prepare the data object for updating
      const data = {
        ...(name && { name }),
        ...(interval && { interval }),
        ...(current_interval && { current_interval }),
        ...(description && { description }),
      };

      // Update the maintenance procedure based on mac_address
      const maintenance_procedure = await prisma.maintenanceprocedure.update({
        where: { id:id, vehicle_id: vehicle_id },
        data,
      });

      return simpleApiResponse("Success", "Maintenance procedure updated", 200);
    } catch (error) {
      return simpleApiResponse("Failure", "Database Error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_vehicle_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {
  ///
  try {
    const body = await request.json();

    try {
      const name = body?.name;
      const description = body?.description;
      const interval = body?.interval;
      const vehicle_id = Number(body?.vehicle_id);
      const userOwnsVehicle = await authenticate_vehicle_ownership(vehicle_id);
        if (!userOwnsVehicle) {
          return simpleApiResponse("Failure", "Not authorized", 400);
        }
      // const image_url = body?.image_url;
      const mainenance_procedure = await prisma.maintenanceprocedure.create({
        data: {
          vehicle_id: vehicle_id,
          name: name,
          ...(description && { description }),
          interval: interval,
        },
      });
      return simpleApiResponse(
        "Success",
        "Maintenence procudeure created",
        200
      );
    } catch (error) {
      return simpleApiResponse("Failure", "Database Error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

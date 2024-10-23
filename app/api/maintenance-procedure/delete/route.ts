import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    const body = await request.json();

    try {
      const id = body?.id;
      const mac_address = body?.mac_address;

      const userOwnsDevice = await authenticate_ownership(mac_address);
      if (!userOwnsDevice) {
        return simpleApiResponse("Failure", "Not authorized", 400);
      }
      // Update the maintenance procedure based on mac_address
      const maintenance_procedure = await prisma.maintenanceprocedure.delete({
        where: { id },
      });

      return simpleApiResponse("Success", "Maintenance procedure deleted", 200);
    } catch (error) {
      return simpleApiResponse("Failure", "Database Error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Invalid JSON body", 400);
  }
}

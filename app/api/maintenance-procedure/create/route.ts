import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";
import { authenticate_ownership } from "../../authenticate_ownership";

// To handle a POST request to /api
export async function POST(request: Request) {

  try {
    const body = await request.json();

    try {
      const mac_address = body?.mac_address;
      const name = body?.name;
      const description = body?.description;
      const interval = body?.interval;
      const userOwnsDevice = await authenticate_ownership(mac_address);
      if (!userOwnsDevice) {
        return simpleApiResponse("Failure", "Not authorized", 400);
      }

      // const image_url = body?.image_url;
      const mainenance_procedure = await prisma.maintenanceprocedure.create({
        data: {
          mac_address: mac_address,
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

import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mac_address = url.searchParams.get("mac_address");

    if (!mac_address) {
      return simpleApiResponse(
        "Failure",
        "mac_address query parameter is required",
        400
      );
    }
    
    try {
      const maintenance_procedures = await prisma.maintenanceprocedure.findMany(
        {
          where: {
            mac_address: mac_address,
          },
        }
      );   
      
    //   const response =  JSON.stringify(maintenance_procedures);
      console.log(maintenance_procedures);

      return simpleApiResponse("Success", "Maintenance procedure updated", 200);
    } catch (error) {
      return simpleApiResponse("Failure", "Database error", 400);
    }
  } catch (error) {
    return simpleApiResponse("Failure", "Bad request", 400);
  }
}

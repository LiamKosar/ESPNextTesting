import { simpleApiResponse } from "../../simpleApi";
import { prisma } from "@/app/lib/prisma";

// To handle a POST request to /api
export async function POST(request: Request) {
    try {
      const body = await request.json();
  
      try {
        const id = body?.id;
        const name = body?.name;
        const interval = body?.interval;
        const description = body?.description;
        
        // Prepare the data object for updating
        const data = {
          ...(name && { name }),
          ...(interval && { interval }),
          ...(description && { description }),
        };
  
        // Update the maintenance procedure based on mac_address
        const maintenance_procedure = await prisma.maintenanceprocedure.update({
          where: { id },
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
  

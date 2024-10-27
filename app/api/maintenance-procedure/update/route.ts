import { crudDatabaseCall, update_maintenance_procedure_api } from "../../prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_read_update_delete_wrapper } from "../../prisma_function_wrappers";

// To handle a POST request to /api
export async function POST(request: Request) {
  return await crudDatabaseCall(
    request,
    RequestType.POST,
    vehicle_read_update_delete_wrapper,
    update_maintenance_procedure_api
  );
}

import { crudDatabaseCall, get_maintenance_procedures_api } from "../../prisma/prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_read_update_delete_wrapper } from "../../prisma/prisma_api_function_wrappers";

export async function GET(request: Request) {
  return await crudDatabaseCall(
    request,
    RequestType.GET,
    vehicle_read_update_delete_wrapper,
    get_maintenance_procedures_api
  );
}

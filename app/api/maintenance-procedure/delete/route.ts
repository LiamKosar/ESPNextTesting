import {
  crudDatabaseCall,
  delete_maintenance_procedure_api,
} from "../../prisma/prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_read_update_delete_wrapper } from "../../prisma/prisma_api_function_wrappers";

export async function POST(request: Request) {
  return await crudDatabaseCall(
    request,
    RequestType.POST,
    vehicle_read_update_delete_wrapper,
    delete_maintenance_procedure_api
  );
}

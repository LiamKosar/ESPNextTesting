import {
  update_vehicle_api,
  crudDatabaseCall,
} from "../../prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_read_update_delete_wrapper } from "../../prisma_function_wrappers";

export async function POST(request: Request) {
  return await crudDatabaseCall(
    request,
    RequestType.POST,
    vehicle_read_update_delete_wrapper,
    update_vehicle_api
  );
}

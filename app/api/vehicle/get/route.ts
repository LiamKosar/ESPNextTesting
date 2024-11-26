import {
  crudDatabaseCall,
  get_vehicles_api,
} from "../../prisma/prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_any_wrapper, vehicle_read_update_delete_wrapper } from "../../prisma/prisma_api_function_wrappers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const vehicle_id = url.searchParams.get("vehicle_id");
  
  if (vehicle_id != null) {
    return await crudDatabaseCall(
      request,
      RequestType.GET,
      vehicle_read_update_delete_wrapper,
      get_vehicles_api
    );
  } else {
    return await crudDatabaseCall(
      request,
      RequestType.GET,
      vehicle_any_wrapper,
      get_vehicles_api
    );
  }
}

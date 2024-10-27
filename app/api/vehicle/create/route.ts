import {
  create_vehicle_api,
  crudDatabaseCall,
} from "../../prisma/prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { vehicle_any_wrapper } from "../../prisma/prisma_function_wrappers";

export async function POST(request: Request) {
  return await crudDatabaseCall(
    request,
    RequestType.POST,
    vehicle_any_wrapper,
    create_vehicle_api
  );
}

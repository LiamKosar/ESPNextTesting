import {
    crudDatabaseCall,
    update_device_api,
  } from "../../prisma/prisma_api_functions";
  import { device_get_update_wrapper } from "../../prisma/prisma_api_function_wrappers";
  import { RequestType } from "@/app/lib/types";

export async function POST(request: Request) {
    return await crudDatabaseCall(
      request,
      RequestType.POST,
      device_get_update_wrapper,
      update_device_api
    );
  }
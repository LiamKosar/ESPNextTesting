import { crudDatabaseCall, get_devices_api, get_maintenance_procedures_api } from "../../prisma/prisma_api_functions";
import { RequestType } from "@/app/lib/types";
import { device_get_update_wrapper, device_any_wrapper } from "../../prisma/prisma_api_function_wrappers";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const mac_address = url.searchParams.get("mac_address");
    
    if (mac_address != null) {
      return await crudDatabaseCall(
        request,
        RequestType.GET,
        device_get_update_wrapper,
        get_devices_api
      );
    } else {
      return await crudDatabaseCall(
        request,
        RequestType.GET,
        device_any_wrapper,
        get_devices_api
      );
    }
}

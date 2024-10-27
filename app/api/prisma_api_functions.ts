import { getSession } from "@auth0/nextjs-auth0";
import { simpleApiResponse } from "./simpleApi";
import { NextResponse } from "next/server";
import { RESPONSE_DATA } from "../lib/constants";
import {
  PrismaQueryFunction,
  PrismaQueryFunctionData,
  PrismaQueryFunctionWrapper,
  RequestType,
} from "../lib/types";
import {
  create_maintenance_procedure,
  create_vehicle,
  delete_maintenance_procedure,
  delete_vehicle,
  get_vehicles,
  get_maintenance_procedures,
  update_maintenance_procedure,
  update_vehicle,
} from "./prisma_functions";
import { prisma } from "../lib/prisma";

export const crudDatabaseCall = async (
  request: Request,
  request_type: RequestType,
  prisma_function_wrapper: PrismaQueryFunctionWrapper,
  prisma_function: PrismaQueryFunction
): Promise<NextResponse> => {
  const session = await getSession();
  const user_email = session?.user?.email;

  if (user_email == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.UNAUTHORIZED,
      RESPONSE_DATA.UNAUTHORIZED_CODE
    );
  }

  try {
    let body = null;
    if (request_type == RequestType.POST) {
      body = await request.json();
    }

    const data = {
      request: request,
      request_type: request_type,
      user_email: user_email,
      body: body,
    };
    return await prisma_function_wrapper(data, prisma_function);
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }
};

export const authenticate_vehicle_ownership = async (
  vehicle_id: number | null,
  user_email: string
): Promise<boolean> => {
  const userOwnsVehicle = await prisma.user
    .findUnique({
      where: {
        email: user_email,
      },
      include: {
        vehicle: true,
      },
    })
    .then((user) => {
      return (
        user?.vehicle?.some((vehicle) => vehicle.vehicle_id === vehicle_id) ||
        false
      );
    });
  return userOwnsVehicle;
};

export const create_maintenance_procedure_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const name = data.body?.name;
  const interval = data.body?.interval;
  const vehicle_id = data.body?.vehicle_id;
  const description = data.body?.description;
  const current_interval = data.body?.current_interval;

  if (name == null || interval == null || vehicle_id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await create_maintenance_procedure(
      vehicle_id,
      name,
      description,
      interval,
      current_interval
    );

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.MAINTENANCE_PROCEDURE_CREATED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_CREATED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const delete_maintenance_procedure_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const id = data.body?.id;

  if (id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await delete_maintenance_procedure(id);

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.MAINTENANCE_PROCEDURE_DELETED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_DELETED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const update_maintenance_procedure_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const id = data.body?.id;
  const name = data.body?.name;
  const interval = data.body?.interval;
  const current_interval = data.body?.current_interval;

  const description = data.body?.description;

  if (id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await update_maintenance_procedure(
      name,
      description,
      interval,
      current_interval,
      id
    );

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.MAINTENANCE_PROCEDURE_UPDATED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_UPDATED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const get_maintenance_procedures_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const url = new URL(data.request.url);
  const vehicle_id = Number(url.searchParams.get("vehicle_id"));
  const id = Number(url.searchParams.get("id"));

  if (vehicle_id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    const result = await get_maintenance_procedures(vehicle_id, id);

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      result,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_GET_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const create_vehicle_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const name = data.body?.name;
  const runtime = data.body?.runtime;
  const mac_address = data.body?.mac_address;
  const image_url = data.body?.image_url;
  const date_updated = new Date().toUTCString();

  if (name == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await create_vehicle(
      name,
      data.user_email,
      image_url,
      runtime,
      date_updated,
      mac_address
    );

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.VEHICLE_CREATED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_CREATED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const update_vehicle_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const vehicle_id = data.body?.vehicle_id;
  const name = data.body?.name;
  const runtime = data.body?.runtime;
  const mac_address = data.body?.mac_address;
  const image_url = data.body?.image_url;
  const user_email = data.body?.user_email;
  const date_updated = new Date().toUTCString();

  if (vehicle_id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await update_vehicle(
      vehicle_id,
      name,
      user_email,
      image_url,
      runtime,
      date_updated,
      mac_address
    );

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.VEHICLE_UPDATED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_UPDATED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const delete_vehicle_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  const vehicle_id = data.body?.vehicle_id;

  if (vehicle_id == null) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_REQUEST,
      RESPONSE_DATA.BAD_REQUEST_CODE
    );
  }

  try {
    await delete_vehicle(vehicle_id);

    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      RESPONSE_DATA.VEHICLE_DELETED,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_DELETED_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

export const get_vehicles_api = async (
  data: PrismaQueryFunctionData
): Promise<NextResponse> => {
  try {
    const url = new URL(data.request.url);
    const vehicle_id = Number(url.searchParams.get("vehicle_id"));
    const result = await get_vehicles(data.user_email, vehicle_id);
    return simpleApiResponse(
      RESPONSE_DATA.SUCCESS_MSG,
      result,
      RESPONSE_DATA.SUCCESSFUL_ENTRY_GET_CODE
    );
  } catch (error) {
    return simpleApiResponse(
      RESPONSE_DATA.FAILURE_MSG,
      RESPONSE_DATA.BAD_GATEWAY,
      RESPONSE_DATA.BAD_GATEWAY_CODE
    );
  }
};

// export const get_single_vehicle_api = async (
//   data: PrismaQueryFunctionData
// ): Promise<NextResponse> => {
//   const url = new URL(data.request.url);
//   const vehicle_id = Number(url.searchParams.get("vehicle_id"));
//   try {
//     const result = await get_single_vehicle(vehicle_id);
//     return simpleApiResponse(
//       RESPONSE_DATA.SUCCESS_MSG,
//       result,
//       RESPONSE_DATA.SUCCESSFUL_ENTRY_GET_CODE
//     );
//   } catch (error) {
//     return simpleApiResponse(
//       RESPONSE_DATA.FAILURE_MSG,
//       RESPONSE_DATA.BAD_GATEWAY,
//       RESPONSE_DATA.BAD_GATEWAY_CODE
//     );
//   }
// };

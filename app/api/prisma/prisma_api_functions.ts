import { getSession } from "@auth0/nextjs-auth0";
import { simpleResponses } from "../simpleApi";
import { NextResponse } from "next/server";
import { RESPONSE_DATA } from "../../lib/constants";
import {
  FindQueryParameters,
  PrismaApiPostResponse,
  PrismaQueryFunction,
  QueryParameters,
} from "../../lib/types";
import {
  PrismaApiQueryFunction,
  PrismaApiQueryFunctionData,
  PrismaApiQueryFunctionWrapper,
  RequestType,
} from "../../lib/types";
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
import { prisma } from "../../lib/prisma";

export const crudDatabaseCall = async (
  request: Request,
  request_type: RequestType,
  prisma_function_wrapper: PrismaApiQueryFunctionWrapper,
  prisma_api_function: PrismaApiQueryFunction
): Promise<NextResponse> => {
  const session = await getSession();
  const user_email = session?.user?.email;

  if (user_email == null) {
    return simpleResponses.simpleUnauthorizedRequestApiResponse();
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
    return await prisma_function_wrapper(data, prisma_api_function);
  } catch (error) {
    return simpleResponses.simpleBaqRequestApiResponse();
  }
};

const handle_post_request = async (
  find_params: FindQueryParameters,
  body: any,
  prisma_function: PrismaQueryFunction,
  response_func: PrismaApiPostResponse
): Promise<NextResponse> => {
  const query_params: QueryParameters | null = get_values_from_body_with_checks(
    find_params,
    body
  );

  if (query_params == null) {
    return simpleResponses.simpleBaqRequestApiResponse();
  } else {
    try {
      await prisma_function(query_params);

      return response_func();
    } catch (error) {
      return simpleResponses.simpleBadGatewayApiResponse();
    }
  }
};

const handle_get_request = async (
  query_params: QueryParameters,
  prisma_function: PrismaQueryFunction
): Promise<NextResponse> => {
  if (query_params == null) {
    return simpleResponses.simpleBaqRequestApiResponse();
  } else {
    try {
      const data = await prisma_function(query_params);

      if (data == null) {
        return simpleResponses.simpleBadGatewayApiResponse();
      }
      return simpleResponses.simpleGetApiResponse(data);
    } catch (error) {
      return simpleResponses.simpleBadGatewayApiResponse();
    }
  }
};

const get_values_from_body_with_checks = (
  find_params: FindQueryParameters,
  body: any
): null | QueryParameters => {
  if (body == null) {
    return null;
  }

  const query_params: QueryParameters = {};

  for (const key in find_params) {
    const value = body[key];

    if (find_params.key == true && value == null) {
      return null;
    }

    query_params[key] = value;
  }

  return query_params;
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
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["name"] = true;
  find_params["interval"] = true;
  find_params["vehicle_id"] = true;
  find_params["description"] = false;
  find_params["current_interval"] = false;

  return await handle_post_request(
    find_params,
    data.body,
    create_maintenance_procedure,
    simpleResponses.simpleEntryCreatedApiResponse
  );
};

export const delete_maintenance_procedure_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["id"] = true;

  return await handle_post_request(
    find_params,
    data.body,
    delete_maintenance_procedure,
    simpleResponses.simpleEntryDeletedApiResponse
  );
};

export const update_maintenance_procedure_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["id"] = true;
  find_params["name"] = false;
  find_params["interval"] = false;
  find_params["vehicle_id"] = false;
  find_params["description"] = false;
  find_params["current_interval"] = false;

  return await handle_post_request(
    find_params,
    data.body,
    update_maintenance_procedure,
    simpleResponses.simpleEntryUpdatedApiResponse
  );
};

export const get_maintenance_procedures_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const url = new URL(data.request.url);
  const vehicle_id = Number(url.searchParams.get("vehicle_id"));
  const id = Number(url.searchParams.get("id"));

  const query_params: QueryParameters = {
    vehicle_id: vehicle_id,
    id: id,
  };

  return await handle_get_request(query_params, get_maintenance_procedures);
};

export const create_vehicle_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["name"] = true;
  find_params["runtime"] = false;
  find_params["mac_address"] = false;
  find_params["image_url"] = false;

  return await handle_post_request(
    find_params,
    data.body,
    create_vehicle,
    simpleResponses.simpleEntryCreatedApiResponse
  );
};

export const update_vehicle_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["vehicle_id"] = true;
  find_params["name"] = false;
  find_params["runtime"] = false;
  find_params["mac_address"] = false;
  find_params["image_url"] = false;
  return await handle_post_request(
    find_params,
    data.body,
    update_vehicle,
    simpleResponses.simpleEntryUpdatedApiResponse
  );
};

export const delete_vehicle_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const find_params: FindQueryParameters = {};
  find_params["vehicle_id"] = true;
  return await handle_post_request(
    find_params,
    data.body,
    delete_vehicle,
    simpleResponses.simpleEntryDeletedApiResponse
  );
};

export const get_vehicles_api = async (
  data: PrismaApiQueryFunctionData
): Promise<NextResponse> => {
  const url = new URL(data.request.url);
  const vehicle_id = Number(url.searchParams.get("vehicle_id"));
  const query_params = {
    user_email: data.user_email,
    vehicle_id: vehicle_id,
  };

  return await handle_get_request(query_params, get_vehicles);
};

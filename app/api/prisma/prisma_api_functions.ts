import { getSession } from "@auth0/nextjs-auth0";
import { simpleResponses } from "../simpleApi";
import { NextResponse } from "next/server";
import {
  FindQueryParameters,
  PrismaApiPostResponse,
  PrismaQueryFunction,
  QueryParameters,
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

/**
 * The first step of any user-facing API request.
 * The goal of this function is
 * 1. Check if there is a logged in user
 * 2. If the request is a post request, get the body
 * 3. Pass the required data on to the prisma function wrapper
 * @param request The Request provided by the api endpoint
 * @param request_type Post/Get request
 * @param prisma_function_wrapper The wrapper that will be called within this function
 * @param prisma_api_function The api function the wrapper will call later
 * @returns An api response based on the data, could be bad request, forbidden, success, etc
 */
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
    const data: PrismaApiQueryFunctionData = {
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

/**
 * Post request handler.
 * This grabs the desired query parameters from the json body of a post request.
 * If a required parameter is not present, returns a bad request response
 * If all required parameters are present, this will try to execute a
 * PrismaQueryFunction with the computed QueryParameters, and return a
 * suitable response
 * @param find_params The FindQueryParameters required by the given PrismaQueryFunction
 * @param body The Json body of the request this function call originates from
 * @param prisma_function The PrismaQueryFunction that will be executed with the query_params
 * @param response_func The successful api response for the provided PrismaQueryFunction (successful creation, deletion, etc...)
 * @returns NextResponse corresponding to successful/failed query, or a bad gateway NextResponse
 */
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

/**
 * Get request handler.
 * This takes QueryParameters, then attempts to call the given PrismaQueryFunction with those params.
 * @param query_params QueryParameters to be injected
 * @param prisma_function PrismaQueryFunction to be queried
 * @returns NextResponse - If successful, the body of the response will include the result of the get operation,
 * otherwise, the response will be some form of error message
 */
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

/**
 * Searches a json body to find the specified FindQueryParameters. Used to abstract null checks for required params.
 * @param find_params FindQueryParameters to find within the body, contains both required and non-required params {key: boolean},
 * where key is the string name of the param, and the boolean (t/f) if that param is required
 * @param body The json body to be searched
 * @returns null if a required param is missing, or a QueryParameters with all parameters and values (can have null values)
 */
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
    if (find_params.key == true && value == null) return null;
    query_params[key] = value;
  }

  return query_params;
};

/**
 * Checks if the currently logged-in user owns a specific vehicle
 * @param vehicle_id 
 * @param user_email 
 * @returns true if user owns vehicle, false otherwise
 */
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

/**
 * Handles creation of a maintenance procedure by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles deletion of a maintenance procedure by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles update of a maintenance procedure by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles get of a maintenance procedure by getting the desired url search params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens (contains 1/many maintenance procedures if successful)
 */
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

/**
 * Handles creation of a vehicle by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles update of a vehicle by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles deletion of a vehicle by creating a list of desired query params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens
 */
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

/**
 * Handles get of a vehicle by getting the desired url search params
 * @param data PrismaApiQueryFunctionData
 * @returns api response correlating to what happens (contains 1/many vehicles if successful)
 */
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

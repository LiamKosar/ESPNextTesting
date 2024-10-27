import { NextResponse } from "next/server";
import { simpleResponses } from "../simpleApi";

import {
  PrismaApiQueryFunction,
  PrismaApiQueryFunctionData,
  PrismaApiQueryFunctionWrapper,
  RequestType,
} from "../../lib/types";
import { authenticate_vehicle_ownership } from "./prisma_api_functions";

/**
 * Handles ANY user-facing operations that read/update/delete anything related to 
 * the vehicle table. This includes maintenance_procedures, because they are associated
 * with a specific vehicle
 * The purpose of this specific wrapper is to check if the current user OWNS the vehicle the operation
 * is being done on
 * @param data the data to be passed on to the PrismaApiQueryFunction
 * @param prisma_function The PrismaApiQueryFunction the wrapper will call
 * @returns Api response based on the data
 */
export const vehicle_read_update_delete_wrapper: PrismaApiQueryFunctionWrapper = async (
  data: PrismaApiQueryFunctionData,
  prisma_function: PrismaApiQueryFunction
): Promise<NextResponse> => {
  let vehicle_id: number;
  if (data.request_type == RequestType.GET) {
    const url = new URL(data.request.url);
    vehicle_id = Number(url.searchParams.get("vehicle_id"));
  } else {
    vehicle_id = data.body.vehicle_id;
  }

  if (vehicle_id == null) {
    return simpleResponses.simpleBaqRequestApiResponse();
  }

  const user_owns_vehicle = await authenticate_vehicle_ownership(
    vehicle_id,
    data.user_email
  );

  if (!user_owns_vehicle) {
    return simpleResponses.simpleForbiddenRequestApiResponse();
  }

  return await prisma_function(data);
};

/**
 * Allows any data to pass through, no user authentication at all.
 * @param data The data to be passed to the PrismaApiQueryFunction
 * @param prisma_function The PrismaApiQueryFunction the wrapper will call
 * @returns Api response based on the data
 */
export const vehicle_any_wrapper: PrismaApiQueryFunctionWrapper = async (
  data: PrismaApiQueryFunctionData,
  prisma_function: PrismaApiQueryFunction
): Promise<NextResponse> => {
  return await prisma_function(data);
};

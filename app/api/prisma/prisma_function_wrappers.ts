import { NextResponse } from "next/server";
import { RESPONSE_DATA } from "../../lib/constants";
import { prisma } from "@/app/lib/prisma";
import { simpleResponses } from "../simpleApi";

import {
  PrismaApiQueryFunction,
  PrismaApiQueryFunctionData,
  PrismaApiQueryFunctionWrapper,
  RequestType,
} from "../../lib/types";
import { authenticate_vehicle_ownership } from "./prisma_api_functions";

export const vehicle_read_update_delete_wrapper = async (
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

export const vehicle_any_wrapper = async (
  data: PrismaApiQueryFunctionData,
  prisma_function: PrismaApiQueryFunction
): Promise<NextResponse> => {
  return await prisma_function(data);
};

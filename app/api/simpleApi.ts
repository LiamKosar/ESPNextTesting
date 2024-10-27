import { NextResponse } from "next/server";
import { RESPONSE_DATA } from "../lib/constants";
import { PrismaApiPostResponse, PrismaApiGetResponse } from "../lib/types";

function simpleApiResponse(
  message: string,
  data: string,
  status: number
): NextResponse {
  return NextResponse.json(
    { message: message, data: data },
    { status: status }
  );
}

const simpleBaqRequestApiResponse = (): NextResponse => {
  return NextResponse.json(
    { message: RESPONSE_DATA.BAD_REQUEST },
    { status: RESPONSE_DATA.BAD_REQUEST_CODE }
  );
};

const simpleUnauthorizedRequestApiResponse = (): NextResponse => {
  return NextResponse.json(
    { message: RESPONSE_DATA.UNAUTHORIZED },
    { status: RESPONSE_DATA.UNAUTHORIZED_CODE }
  );
};

const simpleEntryCreatedApiResponse: PrismaApiPostResponse =
  (): NextResponse => {
    return NextResponse.json(
      { message: RESPONSE_DATA.ENTRY_CREATED },
      { status: RESPONSE_DATA.SUCCESSFUL_ENTRY_CREATED_CODE }
    );
  };

const simpleEntryDeletedApiResponse: PrismaApiPostResponse =
  (): NextResponse => {
    return NextResponse.json(
      { message: RESPONSE_DATA.ENTRY_DELETED },
      { status: RESPONSE_DATA.SUCCESSFUL_ENTRY_DELETED_CODE }
    );
  };

const simpleEntryUpdatedApiResponse: PrismaApiPostResponse =
  (): NextResponse => {
    return NextResponse.json(
      { message: RESPONSE_DATA.ENTRY_UPDATED },
      { status: RESPONSE_DATA.SUCCESSFUL_ENTRY_UPDATED_CODE }
    );
  };

const simpleBadGatewayApiResponse = (): NextResponse => {
  return NextResponse.json(
    { message: RESPONSE_DATA.BAD_GATEWAY },
    { status: RESPONSE_DATA.BAD_GATEWAY_CODE }
  );
};

const simpleGetApiResponse: PrismaApiGetResponse = (
  data: string
): NextResponse => {
  return NextResponse.json(
    { message: RESPONSE_DATA.SUCCESS_MSG, data: data },
    { status: RESPONSE_DATA.SUCCESSFUL_ENTRY_GET_CODE }
  );
};

export const simpleResponses = {
  simpleApiResponse: simpleApiResponse,
  simpleBaqRequestApiResponse: simpleBaqRequestApiResponse,
  simpleUnauthorizedRequestApiResponse: simpleUnauthorizedRequestApiResponse,
  simpleEntryCreatedApiResponse: simpleEntryCreatedApiResponse,
  simpleBadGatewayApiResponse: simpleBadGatewayApiResponse,
  simpleEntryDeletedApiResponse: simpleEntryDeletedApiResponse,
  simpleEntryUpdatedApiResponse: simpleEntryUpdatedApiResponse,
  simpleGetApiResponse: simpleGetApiResponse,
};

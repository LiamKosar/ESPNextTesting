import { NextResponse } from "next/server";

/**
 * Useful in PrismaApiQueryFunctionWrapper
 * Allows the wrapper to check for authentication values (doest the user own the specified resource) in the right place
 * For example, URL param of a Get request, or Body of a Post request.
 */
export enum RequestType {
  POST,
  GET,
}

/**
 * A function that DIRECTLY queries the PostgreSQL database using Prisma
 * Create/Update/Delete - Void
 * Read - String (result table)
 */
export type PrismaQueryFunction = (data: QueryParameters) => Promise<void | string>;

/**
 * A function that specifies the necessary data for a PrismaQueryFunction.
 * In the case of a GET request, this function will grab URL params
 * Passes the data of the request on to a PrismaQueryFunction
 */
export type PrismaApiQueryFunction = (data: PrismaApiQueryFunctionData) => Promise<NextResponse>;

/**
 * A function that wraps a PrismaApiQueryFunction
 * The point of this function is to provide any necessary authentication (ex. Does the user own what they are trying to change?)
 * Before passing on the request to the PrismaApiQueryFunction
 */
export type PrismaApiQueryFunctionWrapper = (data: PrismaApiQueryFunctionData, prisma_function: PrismaApiQueryFunction) => Promise<NextResponse>;

/**
 * A function that returns a NextResponse based on a Post request
 * Ex. Bad Request, Entry Updated, Entry Created, Entry Deleted
 */
export type PrismaApiPostResponse = () => NextResponse;

/**
 * A function that returns a NextResponse based on a Get request
 * Ex. Bad Request, or a json object with the result of a sql query
 */
export type PrismaApiGetResponse = (data: string) => NextResponse;

/**
 * Used to define data a PrismaApiQueryFunction might require
 */
export type PrismaApiQueryFunctionData = {
  request: Request;
  request_type: RequestType;
  user_email: string;
  body: any;
};

/**
 * Used for creating a set of parameters to search for within a json body.
 * The key is the 'name' of the parameter, and the boolean is:
 * - True if the parameter is required
 * - False if the parameter is NOT required
 */
export type FindQueryParameters = {
  [key: string]: boolean;
};

/**
 * Used for creating a final set of parameters to pass to a PrismaQueryFunction
 */
export type QueryParameters = {
  [key: string]: any;
};

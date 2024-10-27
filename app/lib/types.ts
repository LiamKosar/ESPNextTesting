import { NextResponse } from "next/server";


export enum RequestType {
    POST,
    GET
}

export type PrismaQueryFunction = (data: QueryParameters) => Promise<void | string>;
export type PrismaApiQueryFunction = (data: PrismaApiQueryFunctionData) => Promise<NextResponse>;
export type PrismaApiQueryFunctionWrapper = (data: PrismaApiQueryFunctionData, prisma_function: PrismaApiQueryFunction) => Promise<NextResponse>;
export type PrismaApiPostResponse = () => NextResponse;
export type PrismaApiGetResponse = (data: string) => NextResponse;


export type PrismaApiQueryFunctionData = {
    request: Request,
    request_type: RequestType,
    user_email: string,
    body: any
}

export type FindQueryParameters = {
    [key: string]: boolean;
};

export type QueryParameters = {
    [key: string]: any;
};


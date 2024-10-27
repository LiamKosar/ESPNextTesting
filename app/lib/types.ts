import { NextResponse } from "next/server";


export enum RequestType {
    POST,
    GET
}

export enum PrismaFunctionStatus {
    MAINTENANCE_PROCEDURE_CREATED_SUCCESS,
    MAINTENANCE_PROCEDURE_CREATED_FAILURE,
    MAINTENANCE_PROCEDURE_UPDATED_SUCCESS,
    MAINTENANCE_PROCEDURE_UPDATED_FAILURE,
    MAINTENANCE_PROCEDURE_DELETED_SUCCESS,
    MAINTENANCE_PROCEDURE_DELETED_FAILURE,

}

export type PrismaQueryFunction = (data: PrismaQueryFunctionData) => Promise<NextResponse>;
export type PrismaQueryFunctionWrapper = (data: PrismaQueryFunctionData, prisma_function: PrismaQueryFunction) => Promise<NextResponse>;


export type PrismaQueryFunctionData = {
    request: Request,
    request_type: RequestType,
    user_email: string,
    body: any
}
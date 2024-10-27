import { NextResponse } from "next/server";

export function simpleApiResponse(message: string, data: string, status: number): NextResponse {
    return NextResponse.json({ message: message, data: data }, { status: status });
} 
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: any) {
  console.log(request);
  // Do whatever you want
  console.log(NextResponse.json({ message: "Hello World" }, { status: 200 }));
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: any) {
  const body = JSON.parse(request.body)
  console.log(body);


  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

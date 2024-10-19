import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/lib/prisma";
import { getSession } from '@auth0/nextjs-auth0';

// To handle a GET request to /api
export async function GET(request: NextApiRequest) {
  
  
  const session = await getSession();
  const email = session?.user.email;
  console.log(email);
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    // Read the request body
    const body = await request.json(); // Read and parse the JSON body
    console.log(body); // Now, this will print the parsed JSON object

    // Do whatever you want with the parsed body
    return NextResponse.json({ message: "Data received", data: body }, { status: 200 });
  } catch (error) {
    console.error("Error reading request body:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

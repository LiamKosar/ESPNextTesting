import { NextResponse } from "next/server";

const arduino_api_key_check = process.env.ARDUINO_API_KEY;

// To handle a GET request to /api
export async function GET(request: Request) {
  return NextResponse.json(
    { message: "No get available at this endpoint." },
    { status: 400 }
  );
}

// To handle a POST request to /api
export async function POST(request: Request) {
  try {
    // Read the request body
    const body = await request.json(); // Read and parse the JSON body

    const contentType = request.headers.get("Content-Type");
    const authorization = request.headers.get("Authorization");

    if (authorization === arduino_api_key_check) {
      console.log("woooohfoashdfljahsdf");
      // Log the headers
      console.log("Content-Type:", contentType);
      console.log("Authorization Header:", authorization);
      // Do whatever you want with the parsed body
      return NextResponse.json(
        { message: "Api key correct", data: body },
        { status: 200 }
      );
    }
    else {
      return NextResponse.json(
        { message: "Api key incorrect", data: body },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error reading request body:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
   // const user = await sql`SELECT first_name FROM "User" WHERE email = 'kosar.liam@gmail.com' LIMIT 1;`;
//    try {
//     const result = await sql`INSERT INTO "User" (email)
//       VALUES ('aaryanjain1203@gmail.com');`
//     }
//   catch (error) {
    //const firstName = user.rows[0]?.first_name;
   // console.log(result);
    return NextResponse.json(
      { message: "result" },
      { status: 200 }
    );
  }


// To handle a POST request to /api
export async function POST(request: Request) {
  try {

    const contentType = request.headers.get("Content-Type");
    const defaultOwner = 'kosar.liam@gmail.com';

    // Read the request body
    const body = await request.json(); // Read and parse the JSON body
    console.log(body); // Now, this will print the parsed JSON object

   

    // if (authorization === arduino_api_key_check) {
    //   console.log("woooohfoashdfljahsdf");
    //   // Log the headers
    //   // Do whatever you want with the parsed body
    //   return NextResponse.json(
    //     { message: "Api key correct", data: body },
    //     { status: 200 }
    //   );
    // }
    // else {
    //   return NextResponse.json(
    //     { message: "Api key incorrect", data: body },
    //     { status: 400 }
    //   );
    // }
  } catch (error) {
    console.error("Error reading request body:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

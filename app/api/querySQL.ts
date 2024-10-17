import { QueryResultRow, sql } from "@vercel/postgres";

export async function querySQL(
  sqlString: string,
  params: string[]
): Promise<QueryResultRow[]> {
  for (let index = 0; index < params.length; index++) {
    sqlString = sqlString.replace("?",  "\'" + params[index] + "\'");
  }
   const result = await sql`${sqlString}`;

  return result.rows;
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET({ cookies }) {
  const userId = cookies.get("user_id")?.value;
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const passwords = await sql`SELECT id, value, name, level FROM passwords WHERE user_id = ${userId}`;
  return new Response(JSON.stringify({ passwords }));
}
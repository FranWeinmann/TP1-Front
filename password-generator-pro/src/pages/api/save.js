import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function POST({ request, cookies }) {
  const { password } = await request.json();
  const userID = cookies.get("user_id")?.value;

  if (!userID) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  await sql`INSERT INTO passwords (value, user_id) VALUES (${password}, ${userID})`;
  return new Response(JSON.stringify({ ok: true }));
}
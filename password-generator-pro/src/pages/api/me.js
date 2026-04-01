import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET({ cookies }) {
  const userID = cookies.get("user_id")?.value;
  if (!userID) {
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  const users = await sql`SELECT id, full_name, email FROM users WHERE id = ${userID}`;
  const user = users[0];
  return new Response(JSON.stringify({ user }));
}
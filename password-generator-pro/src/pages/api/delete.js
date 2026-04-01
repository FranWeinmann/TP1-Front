import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function POST({ request }) {
  const { passwordID, userID } = await request.json();

  await sql`DELETE FROM passwords WHERE id = ${passwordID} AND user_id = ${userID}`;

  return new Response(JSON.stringify({ ok: true }));
}
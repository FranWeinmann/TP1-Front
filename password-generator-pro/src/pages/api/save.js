import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function POST({ request }) {
  const { password } = await request.json();

  await sql`INSERT INTO passwords (value) VALUES (${password})`;

  return new Response(JSON.stringify({ ok: true }));
}
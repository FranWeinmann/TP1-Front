import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);

export async function POST({ request }) {
  const { full_name, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`INSERT INTO users (full_name, email, password) VALUES (${full_name}, ${email}, ${hashedPassword})`;
    return new Response(JSON.stringify({ ok: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }
}
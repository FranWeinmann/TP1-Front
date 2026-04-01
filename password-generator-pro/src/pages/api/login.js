import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = users[0];

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 400 });
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid password" }), { status: 400 });
  }

  cookies.set("user_id", user.id, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });

  return new Response(JSON.stringify({ ok: true }));
}
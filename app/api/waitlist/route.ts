import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@") || !email.includes(".")) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    return Response.json(
      { message: "Missing SUPABASE_URL in .env.local" },
      { status: 500 }
    );
  }

  if (!supabaseServiceRoleKey) {
    return Response.json(
      { message: "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email: email.trim().toLowerCase() }]);

  if (error) {
    return Response.json(
      {
        message: `Supabase error: ${error.message}`,
        code: error.code,
      },
      { status: 500 }
    );
  }

  return Response.json({
    message: "You're on the waitlist!",
  });
}
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { name, email, category, message } = await request.json();

  if (!name || name.trim().length < 2) {
    return Response.json(
      { message: "Please enter your name." },
      { status: 400 }
    );
  }

  if (!email || !email.includes("@") || !email.includes(".")) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!category) {
    return Response.json(
      { message: "Please choose a contact reason." },
      { status: 400 }
    );
  }

  if (!message || message.trim().length < 10) {
    return Response.json(
      { message: "Please enter a message with at least 10 characters." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Contact service is not configured." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.from("contact_messages").insert([
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      category,
      message: message.trim(),
    },
  ]);

  if (error) {
    return Response.json(
      { message: "Message could not be sent. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Message sent successfully.",
  });
}
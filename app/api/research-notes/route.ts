import { createClient } from "@supabase/supabase-js";

type ResearchNoteRequest = {
  symbol?: string;
  title?: string;
  note?: string;
  id?: string;
};

function isOwnerEmail(email: string) {
  const ownerEmails = process.env.OWNER_EMAILS || "";

  return ownerEmails
    .split(",")
    .map((ownerEmail) => ownerEmail.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

async function getAuthenticatedUser(request: Request) {
  const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!publicSupabaseUrl || !publicSupabaseAnonKey) {
    return null;
  }

  const authorizationHeader = request.headers.get("authorization");
  const accessToken = authorizationHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return null;
  }

  const authClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user?.email) {
    return null;
  }

  return data.user;
}

async function userHasPaidAccess(userId: string, email: string) {
  if (isOwnerEmail(email)) {
    return true;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .or(`user_id.eq.${userId},customer_email.eq.${email}`)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return false;
  }

  const subscription = subscriptions?.[0];

  return (
    (subscription?.plan === "plus" || subscription?.plan === "premium") &&
    (subscription?.status === "active" || subscription?.status === "trialing")
  );
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Research notes service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to view research notes." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to use research notes." },
      { status: 403 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error } = await supabase
    .from("research_notes")
    .select("id, symbol, title, note, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { message: "Research notes could not be loaded." },
      { status: 500 }
    );
  }

  return Response.json({
    notes: data || [],
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Research notes service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to save research notes." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to save research notes." },
      { status: 403 }
    );
  }

  const body: ResearchNoteRequest = await request.json();

  const symbol = body.symbol?.trim().toUpperCase();
  const title = body.title?.trim();
  const note = body.note?.trim();

  if (!symbol || symbol.length > 20) {
    return Response.json(
      { message: "Please enter a valid symbol." },
      { status: 400 }
    );
  }

  if (!title || title.length < 3) {
    return Response.json(
      { message: "Please enter a note title." },
      { status: 400 }
    );
  }

  if (!note || note.length < 10) {
    return Response.json(
      { message: "Please enter a note with at least 10 characters." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase.from("research_notes").insert([
    {
      user_id: user.id,
      user_email: user.email,
      symbol,
      title,
      note,
    },
  ]);

  if (error) {
    return Response.json(
      { message: "Research note could not be saved." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Research note saved.",
  });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return Response.json(
      { message: "Research notes service is not configured." },
      { status: 500 }
    );
  }

  const user = await getAuthenticatedUser(request);

  if (!user?.email) {
    return Response.json(
      { message: "Please sign in to delete research notes." },
      { status: 401 }
    );
  }

  const hasAccess = await userHasPaidAccess(user.id, user.email);

  if (!hasAccess) {
    return Response.json(
      { message: "A Plus or Premium plan is required to delete research notes." },
      { status: 403 }
    );
  }

  const body: ResearchNoteRequest = await request.json();

  if (!body.id) {
    return Response.json(
      { message: "Missing research note ID." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { error } = await supabase
    .from("research_notes")
    .delete()
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (error) {
    return Response.json(
      { message: "Research note could not be deleted." },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Research note deleted.",
  });
}
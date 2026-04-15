import { supabase } from "@/api/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const search = searchParams.get("search") || "";

  let query = supabase.from("categories").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const from = (page - 1) * limit;
  const to = page * limit - 1;

  const { data, error } = await query.range(from, to);

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({
    data,
    page,
  });
}

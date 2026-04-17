import { supabase } from "@/api/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const groupId = searchParams.get("groupId");

  // ❌ wajib 2 parameter
  if (!name || !groupId) {
    return Response.json(
      {
        success: false,
        error: "name dan groupId wajib diisi",
      },
      { status: 400 },
    );
  }

  // 🔥 sanitize input (fix koma & spasi aneh)
  const safeName = name.replace(/,/g, " ").replace(/\s+/g, " ").trim();

  // 🔥 build query step-by-step (lebih aman dari .or bug)
  let query = supabase
    .from("products")
    .select("*")
    .eq("groupId", Number(groupId))
    .limit(20);

  // 🔥 search name (clean + name)
  query = query.or(`name.ilike.%${safeName}%,cleanName.ilike.%${safeName}%`);

  const { data, error } = await query;

  if (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }

  return Response.json({
    success: true,
    count: data?.length || 0,
    data: data || [],
  });
}

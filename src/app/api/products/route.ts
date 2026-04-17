import { supabase } from "@/api/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const groupId = searchParams.get("groupId");

  if (!name || !groupId) {
    return Response.json(
      {
        success: false,
        error: "name dan groupId wajib diisi",
      },
      { status: 400 },
    );
  }

  const search = name.trim();
  const cleanSearch = search.replace(/,/g, "");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("groupId", Number(groupId))
    .or(`name.ilike."%${search}%",cleanName.ilike."%${cleanSearch}%"`)
    .limit(20);

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

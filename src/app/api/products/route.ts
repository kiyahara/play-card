import { supabase } from "@/api/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name");
    const groupId = searchParams.get("groupId");

    // ✅ Validasi basic
    if (!name || !groupId) {
      return Response.json(
        {
          success: false,
          error: "name dan groupId wajib diisi",
        },
        { status: 400 },
      );
    }

    // ✅ Clean input search
    const search = name.trim();
    const cleanSearch = search.replace(/,/g, "");

    // ✅ Parse groupId string → number[]
    const groupIds = groupId
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));

    // ❗ Validasi hasil parsing
    if (groupIds.length === 0) {
      return Response.json(
        {
          success: false,
          error: "groupId tidak valid",
        },
        { status: 400 },
      );
    }

    // ✅ Query ke Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("groupId", groupIds)
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
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err.message || "Unexpected error",
      },
      { status: 500 },
    );
  }
}

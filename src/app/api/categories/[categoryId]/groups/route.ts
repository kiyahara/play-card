import { supabase } from "@/api/lib/supabase";

export async function GET(
  req: Request,
  context: { params: Promise<{ categoryId: string }> },
) {
  const params = await context.params; // 🔥 WAJIB
  const categoryId = Number(params.categoryId);

  if (isNaN(categoryId)) {
    return Response.json({ message: "Invalid categoryId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("categoryId", categoryId);

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json(data);
}

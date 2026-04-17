import { apiSupabase } from "@/api";

async function getAllCategoriesCardMarketGA() {
  const response = await apiSupabase.get("/categories");
  return response.result;
}

async function getGroupsByCategoryId(categoryId: number) {
  const response = await apiSupabase.get(`/categories/${categoryId}/groups`);
  return response.result;
}

async function getPriceByGroupId(groups: number, name: string) {
  const response = await apiSupabase.get(
    `products?groupId=${groups}&name=${name}`,
  );
  return response.result;
}

export const marketGAService = {
  getAllCategoriesCardMarketGA,
  getGroupsByCategoryId,
  getPriceByGroupId,
};

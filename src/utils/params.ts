import { Params } from "@/types";

export function generateSearchParams({
  name,
  page,
  pageSize,
  num,
  offset,
}: Params): string {
  const result: string[] = [];
  if (!name && !page && !pageSize && !num && !offset) {
    return "";
  }

  if (name) {
    result.push(`name=${name}`);
  }
  if (page) {
    result.push(`page=${page}`);
  }
  if (pageSize) {
    result.push(`page_size=${pageSize}`);
  }
  if (num) {
    result.push(`num=${num}`);
  }
  if (offset) {
    result.push(`offset=${offset}`);
  }

  return result.join("&");
}

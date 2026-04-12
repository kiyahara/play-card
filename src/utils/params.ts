import { Params } from "@/types";

export function generateSearchParams({ name, page, pageSize }: Params): string {
  const result: string[] = [];
  if (!name && !page && !pageSize) {
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

  return result.join("&");
}

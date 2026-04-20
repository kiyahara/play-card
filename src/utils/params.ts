import { Params } from "@/types";

export function generateSearchParams({
  name,
  page,
  pageSize,
  num,
  offset,
  elements,
  sets,
  effect,
}: Params): string {
  const result: string[] = [];
  if (
    !name &&
    !page &&
    !pageSize &&
    !num &&
    !offset &&
    !elements &&
    !sets &&
    !effect
  ) {
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
  if (elements && elements?.length > 0) {
    elements.map((value) => result.push(`element=${value}`));
  }
  if (sets && sets?.length > 0) {
    sets.map((value) => result.push(`prefix=${value}`));
  }
  if (effect) {
    result.push(`effect=${effect}`);
  }

  return result.join("&");
}

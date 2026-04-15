import { apiGA } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function getAllDataCardGA(Param: Params) {
  const url =
    "/cards/search?separate_editions=true&" + generateSearchParams(Param);
  const response = await apiGA.get(url);
  return response.result;
}

export const GaService = {
  getAllDataCardGA,
};

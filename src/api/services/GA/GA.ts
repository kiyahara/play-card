import { apiGA } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

const urlFirst = "/cards/search?separate_editions=true&";
async function getAllDataCardGA(Param: Params) {
  const url = "/cards/search?" + generateSearchParams(Param);
  const response = await apiGA.get(url);
  return response.result;
}

export const GaService = {
  getAllDataCardGA,
};

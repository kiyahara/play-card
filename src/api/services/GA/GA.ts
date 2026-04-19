import { apiGA } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function getAllDataCardGA(Param: Params) {
  const url = "/cards/search?" + generateSearchParams(Param);
  const response = await apiGA.get(url);
  return response.result;
}

async function getAllOptionsGA() {
  const response = await apiGA.get("/option/search");
  return response.result;
}

export const GaService = {
  getAllOptionsGA,
  getAllDataCardGA,
};

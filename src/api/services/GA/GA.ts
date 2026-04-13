import { api } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function getAllDataCard(Param: Params) {
  const url = "/cards/search?" + generateSearchParams(Param);
  const response = await api.get(url);
  return response.result;
}

export const GaService = {
  getAllDataCard,
};

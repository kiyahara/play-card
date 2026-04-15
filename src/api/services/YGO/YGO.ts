import { apiYGO } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function getAllDataCardYGO(Param: Params) {
  const url = "cardinfo.php?" + generateSearchParams(Param);
  const response = await apiYGO.get(url);
  return response.result;
}

export const YGOService = {
  getAllDataCardYGO,
};

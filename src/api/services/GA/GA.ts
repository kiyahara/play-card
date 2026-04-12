import { api } from "@/api";

async function getAllDataCard() {
  const url = "/cards/search?";
  const response = await api.get(url);
  return response.result;
}

export const GaService = {
  getAllDataCard,
};

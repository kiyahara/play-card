export const formatUSD = (number: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(number) || "-";
};

const rarityMap: Record<number, string> = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Super Rare",
  5: "Ultra Rare",
  6: "Promotional Rare",
  7: "Collector Super Rare",
  8: "Collector Ultra Rare",
  9: "Collector Promo Rare",
};

const shortRarityMap: Record<number, string> = {
  1: "C",
  2: "U",
  3: "R",
  4: "SR",
  5: "UR",
  6: "Promo",
  7: "CSR",
  8: "CUR",
  9: "CPR",
};

export const rarityTranslate = (number: number) => {
  return rarityMap[number] ?? "Unknown";
};

export const capitalizeManual = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const shortRarityTranslate = (number: number) => {
  return shortRarityMap[number] ?? "Unknown";
};

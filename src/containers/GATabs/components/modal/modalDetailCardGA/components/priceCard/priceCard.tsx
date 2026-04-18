import { DetailProductGAWithPriceInterface, EditionGA } from "@/types";
import { Flex, Image, Text } from "@mantine/core";
import moment from "moment";
import classes from "./priceCard.module.css";
import { rarityTranslate } from "@/utils";

interface PropsPriceCardModalDetailGATypes {
  dataSet: EditionGA;
  dataPrice: DetailProductGAWithPriceInterface[];
  name: string;
}

export function PriceCardModalDetailGA({
  dataSet,
  dataPrice,
  name,
}: PropsPriceCardModalDetailGATypes) {
  const filteredPrice = dataPrice?.filter(
    (valuePrice) =>
      valuePrice.extNumber === dataSet.collector_number &&
      valuePrice.extRarity == rarityTranslate(dataSet.rarity),
  );

  return (
    <Flex w="100%" direction="column" gap={10}>
      <Text size="lg" fw="bold" pt={5} w="100%">
        All Available Pricing :
      </Text>

      <Text size="sm" ta="start" w="100%">
        Last Modified On :{" "}
        {dataPrice.length > 0
          ? moment(dataPrice[0].modifiedOn).format("DD/MM/YYYY")
          : "-"}
      </Text>

      {filteredPrice.length > 0 ? (
        filteredPrice.map((valuePrice, indexPrice) => (
          <Flex
            key={indexPrice}
            className={classes.card}
            direction="column"
            gap={8}
            w="100%"
          >
            <Text size="sm" fw="bold">
              {valuePrice.subTypeName}
            </Text>

            <Flex justify="space-between" w="100%">
              <Flex direction="column" align="center" style={{ flex: 1 }}>
                <Text size="sm">Market</Text>
                <Text c={valuePrice.marketPrice ? "#05df72" : ""}>
                  {valuePrice.marketPrice ? `$${valuePrice.marketPrice}` : "-"}
                </Text>
              </Flex>

              <Flex direction="column" align="center" style={{ flex: 1 }}>
                <Text size="sm">Low</Text>
                <Text c={valuePrice.lowPrice ? "#3370D4" : ""}>
                  {valuePrice.lowPrice ? `$${valuePrice.lowPrice}` : "-"}
                </Text>
              </Flex>

              <Flex direction="column" align="center" style={{ flex: 1 }}>
                <Text size="sm">High</Text>
                <Text c={valuePrice.highPrice ? "#ff6467" : ""}>
                  {valuePrice.highPrice ? `$${valuePrice.highPrice}` : "-"}
                </Text>
              </Flex>
            </Flex>

            <Flex
              className={classes.cardImg}
              justify="center"
              align="center"
              onClick={() => window.open(valuePrice.url, "_blank")}
              w="50%"
            >
              <Image
                h={16}
                src="https://tcg-architect-bucket.nyc3.cdn.digitaloceanspaces.com/images/tcgplayer-logo-full-color-secondary-white.png"
                alt="logo"
              />
            </Flex>
          </Flex>
        ))
      ) : (
        <>
          <Text size="sm" fw="bold">
            Prices Not Available
          </Text>

          <Flex
            className={classes.cardImg}
            justify="center"
            align="center"
            onClick={() =>
              window.open(
                `https://partner.tcgplayer.com/YRkBZm?url=https://www.tcgplayer.com/search/grand-archive/product?q=${name}`,
                "_blank",
              )
            }
            w="50%"
          >
            <Image
              h={16}
              src="https://tcg-architect-bucket.nyc3.cdn.digitaloceanspaces.com/images/tcgplayer-logo-full-color-secondary-white.png"
              alt="logo"
            />
          </Flex>
        </>
      )}
    </Flex>
  );
}

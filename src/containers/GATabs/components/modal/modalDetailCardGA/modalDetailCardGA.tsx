import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import {
  DetailCardGrandArchive,
  DetailProductGAWithPriceInterface,
} from "@/types";
import { Flex, Image, Text } from "@mantine/core";
import { capitalizeManual, errorNotification, rarityTranslate } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import classes from "./modalDetailCardGA.module.css";
import React, { useEffect, useState } from "react";
import { marketGAService } from "@/api/services";
import moment from "moment";
import ShowLoadingModal from "@/utils/swal";

interface PropsModalDetailCardGATypes {
  dataDetail: DetailCardGrandArchive | null;
  openModal: boolean;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalDetailCardGA({
  dataDetail,
  openModal,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  const [dataPrice, setDataPrice] = useState<
    DetailProductGAWithPriceInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  async function getPriceByGroupId() {
    setLoading(true);
    console.log(dataDetail);
    try {
      const response = await marketGAService.getPriceByGroupId(
        dataDetail?.dataGroup.groupId ?? 0,
        dataDetail?.name ?? "",
      );

      if (response) {
        setDataPrice(response.data);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (dataDetail && openModal) {
      getPriceByGroupId();
    }
  }, [openModal]);

  return (
    <>
      <ShowLoadingModal isLoading={loading} />
      {!loading ? (
        <ModalUniversal
          opened={openModal}
          title={null}
          close={() => setOpenModal(false)}
          size={isMobile ? "100%" : "70%"}
        >
          {dataDetail ? (
            <Flex
              justify={"start"}
              align={isMobile ? "center" : "start"}
              gap={20}
              p={16}
              direction={isMobile ? "column" : "row"}
              style={{
                background: "transparent",
                borderRadius: 20,
              }}
            >
              <Image
                h="100%"
                w={isMobile ? 150 : 350}
                src={`https://api.gatcg.com${dataDetail.result_editions[0].image}`}
                alt="logo"
                radius={10}
              />
              <Flex
                justify={"space-between"}
                align={"start"}
                direction={"column"}
                gap={5}
                w={isMobile ? "100%" : ""}
              >
                <Text size="lg" fw={"bold"} pb={5}>
                  Card Details :{" "}
                </Text>
                <Flex align="center" gap={6}>
                  <Flex
                    className={classes.elementEffect}
                    style={{
                      backgroundImage: `url("https://cdn2.gatcg.com/i/elements/${dataDetail.element.toLowerCase()}.png")`,
                    }}
                  />
                  <Text size="md">{dataDetail.name}</Text>
                </Flex>
                <Flex align="center" gap={6}>
                  <Flex
                    className={classes.typeEffect}
                    style={{
                      backgroundImage: `url("https://cdn2.gatcg.com/i/types/${dataDetail.types.includes("ALLY") ? "ally" : "ally"}.png")`,
                    }}
                  />
                  <Text size={"sm"}>
                    {capitalizeManual(dataDetail.types.join(" "))} —{" "}
                    {capitalizeManual(dataDetail.subtypes.join(" "))}
                  </Text>
                </Flex>
                <Text size="lg" fw={"bold"} pt={5}>
                  Effect :{" "}
                </Text>
                <Flex
                  dangerouslySetInnerHTML={{
                    __html: dataDetail.effect_raw.replace(/\n/g, "<br />"),
                  }}
                />
                <Text size="lg" fw={"bold"} pt={5}>
                  Flavor Text :{" "}
                </Text>
                {dataDetail.flavor ? (
                  <Flex
                    dangerouslySetInnerHTML={{
                      __html: dataDetail.flavor.replace(/\n/g, "<br />"),
                    }}
                  />
                ) : (
                  <Text size={"sm"}>No flavor text available</Text>
                )}
                <Text size="lg" fw={"bold"} pt={5}>
                  All Availble Pricing :{" "}
                </Text>
                <Text size="sm" ta={"center"}>
                  Last Modified On :{" "}
                  {dataPrice.length > 0
                    ? moment(dataPrice[0].modifiedOn).format("DD/MM/YYYY")
                    : "-"}
                </Text>
                {dataPrice.filter(
                  (valuePrice) =>
                    valuePrice.extNumber ==
                      dataDetail.result_editions[0].collector_number &&
                    rarityTranslate(dataDetail.result_editions[0].rarity) ==
                      valuePrice.extRarity,
                ).length > 0 && dataPrice != null ? (
                  <>
                    {dataPrice
                      .filter(
                        (valuePrice) =>
                          valuePrice.extNumber ==
                            dataDetail.result_editions[0].collector_number &&
                          rarityTranslate(
                            dataDetail.result_editions[0].rarity,
                          ) == valuePrice.extRarity,
                      )
                      .map((valuePrice, indexPrice) => {
                        return (
                          <React.Fragment key={indexPrice}>
                            <Flex
                              className={classes.card}
                              direction={"column"}
                              gap={5}
                              w={"100%"}
                            >
                              <Text size="sm" fw={"bold"}>
                                {valuePrice.subTypeName}
                              </Text>
                              <Flex
                                direction={"row"}
                                justify={"space-evenly"}
                                align={"start"}
                                gap={10}
                              >
                                <Flex direction={"column"} align={"center"}>
                                  <Text size="sm">Market</Text>
                                  <Text
                                    size="sm"
                                    c={valuePrice.marketPrice ? "#05df72" : ""}
                                  >
                                    {`${valuePrice.marketPrice ? `$${valuePrice.marketPrice}` : "-"}`}
                                  </Text>
                                </Flex>

                                <Flex direction={"column"} align={"center"}>
                                  <Text size="sm">Low</Text>
                                  <Text
                                    size="sm"
                                    c={valuePrice.lowPrice ? "#3370D4" : ""}
                                  >
                                    {`${valuePrice.lowPrice ? `$${valuePrice.lowPrice}` : "-"}`}
                                  </Text>
                                </Flex>
                                <Flex direction={"column"} align={"center"}>
                                  <Text size="sm">High</Text>
                                  <Text
                                    size="sm"
                                    c={valuePrice.highPrice ? "#ff6467" : ""}
                                  >
                                    {`${valuePrice.highPrice ? `$${valuePrice.highPrice}` : "-"}`}
                                  </Text>
                                </Flex>
                              </Flex>
                              <Flex
                                className={classes.cardImg}
                                direction={"column"}
                                gap={5}
                                onClick={() => {
                                  window.open(`${valuePrice.url}`, "_blank");
                                }}
                                w={isMobile ? "50%" : "40%"}
                                // w={150}
                              >
                                <Image
                                  h={16}
                                  src="https://tcg-architect-bucket.nyc3.cdn.digitaloceanspaces.com/images/tcgplayer-logo-full-color-secondary-white.png"
                                  alt="logo"
                                />
                              </Flex>
                            </Flex>
                          </React.Fragment>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <Text size="sm" fw={"bold"}>
                      Prices Not Available
                    </Text>
                    <Flex
                      className={classes.cardImg}
                      direction={"column"}
                      gap={5}
                      onClick={() => {
                        window.open(
                          `https://partner.tcgplayer.com/YRkBZm?url=https://www.tcgplayer.com/search/grand-archive/product?q=${dataDetail.name}`,
                          "_blank",
                        );
                      }}
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
            </Flex>
          ) : (
            ""
          )}
        </ModalUniversal>
      ) : (
        ""
      )}
    </>
  );
}

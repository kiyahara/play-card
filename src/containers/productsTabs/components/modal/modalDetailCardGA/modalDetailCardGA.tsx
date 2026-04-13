import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import { DetailCardGrandArchive } from "@/types";
import { Box, Flex, Image, Text } from "@mantine/core";
import { capitalizeManual, formatUSD } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import classes from "./modalDetailCardGA.module.css";

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
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  return (
    <ModalUniversal
      opened={openModal}
      title={null}
      close={() => setOpenModal(false)}
      size={isMobile ? "100%" : "40%"}
    >
      {dataDetail ? (
        <Flex
          bg={"black"}
          justify={"start"}
          align={isMobile ? "center" : "start"}
          gap={20}
          direction={isMobile ? "column" : "row"}
        >
          <Image
            h="100%"
            w={isMobile ? 150 : 250}
            src={`https://api.gatcg.com${dataDetail.result_editions[0].image}`}
            alt="logo"
            radius="md"
          />
          <Flex
            justify={"space-between"}
            align={"start"}
            direction={"column"}
            gap={5}
            w={isMobile ? "100%" : ""}
          >
            <Flex align="center" gap={6}>
              <Flex
                className={classes.elementEffect}
                style={{
                  backgroundImage: `url("https://cdn2.gatcg.com/i/elements/${dataDetail.element.toLowerCase()}.png")`,
                }}
              />
              <Text fz="md">{dataDetail.name}</Text>
            </Flex>
            <Flex align="center" gap={6}>
              <Flex
                className={classes.typeEffect}
                style={{
                  backgroundImage: `url("https://cdn2.gatcg.com/i/types/${dataDetail.types.includes("ALLY") ? "ally" : "ally"}.png")`,
                }}
              />
              <Text fz={"sm"}>
                {capitalizeManual(dataDetail.types.join(" "))} —{" "}
                {capitalizeManual(dataDetail.subtypes.join(" "))}
              </Text>
            </Flex>
            <Flex
              dangerouslySetInnerHTML={{
                __html: dataDetail.effect_raw.replace(/\n/g, "<br />"),
              }}
            />

            <Box mt="xs"></Box>

            <Box mt="xs">
              <Text size="sm">26 Listings From:</Text>
              <Text fz="lg" c="#05772d">
                {formatUSD(44.2)}
              </Text>
            </Box>
          </Flex>
        </Flex>
      ) : (
        // </Flex>
        ""
      )}
    </ModalUniversal>
  );
}

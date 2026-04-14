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
            // backdropFilter: "blur(30px) saturate(160%)",
            // WebkitBackdropFilter: "blur(30px) saturate(160%)",
            // border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            // boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            h="100%"
            w={isMobile ? 150 : 250}
            src={`https://api.gatcg.com${dataDetail.result_editions[0].image}`}
            alt="logo"
            radius={20}
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

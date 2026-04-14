import { Box, Card, Flex, Image, Text } from "@mantine/core";
import classes from "./contentCardGA.module.css";
import { DetailCardGrandArchive } from "@/types";
import { formatUSD, rarityTranslate } from "@/utils";

interface PropCardItemProductTabsTypes {
  value: DetailCardGrandArchive;
  onClick: () => void;
}

export function ContentCardGA({
  value,
  onClick,
}: PropCardItemProductTabsTypes) {
  return (
    <Card
      className={classes.glassCard}
      padding={5}
      withBorder
      orientation="horizontal"
      radius={12}
      shadow="sm"
      c="white"
      onClick={onClick}
    >
      <Box
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
          top: -50,
          right: -50,
          filter: "blur(40px)",
        }}
      />

      {/* <Box
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      /> */}

      <Card.Section inheritPadding px={0} w="50%">
        <Image
          h="100%"
          w={200}
          src={`https://api.gatcg.com${value.editions[0].image}`}
          alt="logo"
          radius="md"
        />
      </Card.Section>

      <Card.Section inheritPadding px={5} w="50%">
        <Flex justify={"space-between"} direction={"column"} gap={5}>
          <Text fz="md">{value.name}</Text>

          <Box mt="xs">
            <Text size="sm">{value.result_editions[0].set.name}</Text>
            <Text fz="sm" c="dimmed">
              {value.result_editions[0].set.prefix}
            </Text>
            <Text fz="sm" c="dimmed">
              {rarityTranslate(value.result_editions[0].rarity)}, #
              {value.result_editions[0].collector_number}
            </Text>
          </Box>

          <Box mt="xs"></Box>

          <Box mt="xs">
            <Text size="sm">26 Listings From:</Text>
            <Text fz="lg" c="#05772d">
              {formatUSD(44.2)}
            </Text>
          </Box>
        </Flex>
      </Card.Section>
    </Card>
  );
}
